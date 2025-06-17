import CarouselResearchWrapper from "./CarouselResearchWrapper";

const PopularResearch = () => (
  <CarouselResearchWrapper
    title="Популярні дослідження"
    endpoint="http://localhost:3000/research/popular"
    dataKey="popularResearch"
  />
);

export default PopularResearch;
