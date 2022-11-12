import { images } from '../../assets/data';
import { useFetch } from '../../hooks/useFetch';

import cls from './FeaturedProperties.module.css';

export const FeaturedProperties = () => {
  const { data, loading, error } = useFetch('/hotels?feature=true&limit=4');

  if (error) {
    return <div className={cls.fp}>Something went wrong</div>;
  }

  if (loading) {
    return (
      <div className={cls.fp} style={{ height: 150 }}>
        Loading
      </div>
    );
  }

  return (
    <div className={cls.fp}>
      {data.map((item) => (
        <div className={cls.fpItem} key={item._id}>
          <img src={item.photos[0] ?? images[0].img} alt="" className={cls.fpImg} />
          <span className={cls.fpName}>{item.name}</span>
          <span className={cls.fpCity}>{item.city}</span>
          <span className={cls.fpPrice}>Starting from ${item.cheapestPrice}</span>

          {item.rating && (
            <div className={cls.fpRating}>
              <button>{item.rating}</button>
              <span>Excellent</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
