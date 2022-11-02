import React, { useEffect, useState } from "react";
import StoryList from "../components/StoryList";


const StoryContainer = () => {
    //state
    const [ story, setStory ] = useState([]);

    //use call api
    useEffect(() => {
        fetch('https://hacker-news.firebaseio.com/v0/topstories.json').then(res => res.json())
        .then((data) => {
            //get arr of id's ..make copy, reduce arr and turn that arr into arr of promises
            const copyStoryArr = [...data];
            const reducedStoryArr = copyStoryArr.splice(0, 10);
            console.log(reducedStoryArr);
            //store all promises(api call result in future) 
             const promiseStories = reducedStoryArr.map((id) => {
            //     //loop arr of id's and inject each id into server call
               return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then((res) => res.json());
            });
            //wrap up all promises
             console.log(promiseStories);
             Promise.all(promiseStories).then((data) => {
                setStory(data);
              });
        });
    },[]);



    return (
        // pass it down as props
        <>
             <StoryList story={story}/>
        </>
    );

}
export default StoryContainer;