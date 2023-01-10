import React, { useState } from 'react';
import SubNav from '../components/SubNav';
import Gallery from '../components/Gallery'

export default function Photos() {

  const [categories] = useState([
    {
      name: "outside",
      description:
        "Your breathtaking view from the house",
    },
    { name: "living", description: "Main living spaces" },
    { name: "bedrooms", description: "Photos of the three beautifully decorated bedrooms" },
    {
      name: "other",
      description: "Pictures that defy categorization.",
    },
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
      <main className="container mx-auto p-6" >
            <Gallery currentCategory={currentCategory}></Gallery>
      </main>
    </div>
  );
}