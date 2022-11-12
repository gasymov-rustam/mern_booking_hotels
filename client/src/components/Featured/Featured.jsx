import { images } from '../../assets/data';
import { useFetch } from '../../hooks/useFetch';

import cls from './Featured.module.css';

export const Featured = () => {
  const { data, loading, error } = useFetch('/hotels/countByCity?cities=Berlin,Dnipro,Kiev');

  if (error) {
    return <div className={cls.featured}>Something went wrong</div>;
  }

  if (loading) {
    return <div className={cls.featured}>Loading please wait</div>;
  }

  return (
    <div className={cls.featured}>
      {images.map((img, idx) => (
        <div key={img.city} className={cls.featuredItem}>
          <img src={img.img} alt={img.alt} className={cls.featuredImg} />

          <div className={cls.featuredTitles}>
            <h1>{img.city}</h1>
            <h2>{data[idx]} properties</h2>
          </div>
        </div>
      ))}
    </div>
  );
};
