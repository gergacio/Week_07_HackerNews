import React from "react";

const StoryList = ({story}) => {
    //turn from obj 
    const storyListComp = story.map((s) => {
        return <li>{s.title}</li>
    });
    return (
       <>
         <ul>
            {storyListComp}
         </ul>
       </>
    );
}
export default StoryList;