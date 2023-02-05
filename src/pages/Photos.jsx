import React, { useState } from 'react';
import SubNav from '../components/SubNav';
import Gallery from '../components/Gallery'
import { SocialIcon } from 'react-social-icons';

export default function Photos() {

  const [categories] = useState([
    { categoryName: "all", description: "Your peaceful retreat in the mountains!" },
    { categoryName: "outside", description: "Your breathtaking view from the house" },
    { categoryName: "living", description: "Well appointed main living spaces" },
    { categoryName: "bedrooms", description: "Photos of the three beautifully decorated bedrooms" },
    { categoryName: "other", description: "Pictures that defy categorization." },
  ]);

  const [currentCategory, setCurrentCategory] = useState(categories[0]);
  const [contactSelected, setContactSelected] = useState(false);

  return (
    <div>
      <SubNav

        categories={categories}
        setCurrentCategory={setCurrentCategory}
        currentCategory={currentCategory}
        contactSelected={contactSelected}
        setContactSelected={setContactSelected}
      ></SubNav>
      <SocialIcon url="https://www.instagram.com/blueridge.hideaway/" bgColor="#546a7b" style={{ height: 25, width: 25 }} />
      <main className="container mx-auto px-6" >

        {(currentCategory.categoryName === "all")
          ?
          <>
            {/* TODO - make this work with loop - somehow get useState to work here */}
            {/* The following statement causes a re-render so that only the last category is shown */}
            {/* {setCurrentCategory(categories[1])} */}
            <Gallery currentCategory={{}}></Gallery>
            <Gallery currentCategory={{ categoryName: "outside", description: "Your breathtaking view from the house" }}></Gallery>
            <Gallery currentCategory={{ categoryName: "living", description: "Well appointed main living spaces" }}></Gallery>

            <Gallery currentCategory={{ categoryName: "bedrooms", description: "Photos of the three beautifully decorated bedrooms" }}></Gallery>
            <Gallery currentCategory={{ categoryName: "other", description: "Pictures that defy categorization." }}></Gallery>
          </>
          : <Gallery currentCategory={currentCategory}></Gallery>
        }
      </main>
    </div>
  );
}