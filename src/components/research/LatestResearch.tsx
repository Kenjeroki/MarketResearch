import CarouselResearchWrapper from "./CarouselResearchWrapper";

const LatestResearch = () => (
  <CarouselResearchWrapper
    title="Останні дослідження"
    endpoint="http://localhost:3000/research/latest"
    dataKey="latestResearch"
  />
);

export default LatestResearch;
