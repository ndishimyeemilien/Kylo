import  { Link } from 'react-router-dom';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link 
      to={`/products?category=${category.name.toLowerCase()}`}
      className="relative block group overflow-hidden rounded-lg h-64"
    >
      <img 
        src={category.image} 
        alt={category.name} 
        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-xl font-semibold text-white">{category.name}</h3>
        <p className="text-sm text-white opacity-90 mt-1">{category.itemCount} Products</p>
      </div>
    </Link>
  );
};

export default CategoryCard;
 