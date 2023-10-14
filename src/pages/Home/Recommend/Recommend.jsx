import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import image from "../../../assets/home/slide5.jpg";
import Card from "../../../components/Card/Card";

const Recommend = () => {
  return (
    <div>
      <SectionTitle
        subtitle="Should Try"
        title="CHEF RECOMMENDS"
        black={true}
      ></SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 px-4">
        <Card
          cardImage={image}
          name="Caeser Salad"
          description="Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets."
        />
        <Card
          cardImage={image}
          name="Caeser Salad"
          description="Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets."
        />
        <Card
          cardImage={image}
          name="Caeser Salad"
          description="Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets."
        />
      </div>
    </div>
  );
};

export default Recommend;
