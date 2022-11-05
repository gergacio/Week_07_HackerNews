import React, { useEffect, useState } from "react";
import StoryList from "../components/StoryList";
import Filter from "../components/Filter";



const StoryContainer = () => {
    //state
    const [ stories, setStories ] = useState([]);
    //new state
    const [filteredStories, setFilteredStories] = useState([]);

    //use call api
    //get res ,turn in json..do what we want with data
    useEffect(() => {
        fetch('https://hacker-news.firebaseio.com/v0/topstories.json').then(res => res.json())
        .then((data) => {
            //get arr of id's ..make copy, reduce arr and turn that arr into arr of promises
            const copyStoryArr = [...data];
            const reducedStoryArr = copyStoryArr.splice(0, 10);
            console.log(reducedStoryArr);
            //store all promises(api call result in future) 
            //map arr of id, turn them into arr of promises
             const promiseStories = reducedStoryArr.map((id) => {
            //     //loop arr of id's and inject each id into server call
               return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then((res) => res.json());
            });
            //wrap up all promises as give it as argument to Promise.all
            // console.log(promiseStories);
            
             Promise.all(promiseStories).then((data) => {
                //update story 
                setStories(data);
              });
        });
    },[]);
    //pass filter down as props ,get the term
    const filter = (searchTerm) => {
        const lowerSearch = searchTerm.toLowerCase();
        const filteredStories = stories.filter((story) => {
          // return story.title.toLowerCase().indexOf(lowerSearch) > -1;
          return story.title.toLowerCase().includes(lowerSearch);
        });
        //update filter
        setFilteredStories(filteredStories);
      }



    return (
        // pass it down as props
        <>
            <Filter handleChange={filter}/>
             <StoryList stories={filteredStories}/>

        </>
    );

}
export default StoryContainer;