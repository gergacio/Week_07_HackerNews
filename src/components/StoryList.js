import React from "react";
import Story from "./Story";
const StoryList = ({stories}) => {
    //turn from obj 
    const storyListComp = stories.map((story, i) => {
      return (<Story key={i} details={story} position={i+1} />);
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