import { imagesPropertyList } from '../../assets/data';
import { useFetch } from '../../hooks/useFetch';

import cls from './PropertyList.module.css';

export const PropertyList = () => {
  const { data, loading, error } = useFetch('/hotels/countByType');

  if (error) {
    return <div className={cls.pList}>Something went wrong</div>;
  }

  if (loading) {
    return <div className={cls.pList}>Loading please wait</div>;
  }

  return (
    <div className={cls.pList}>
      {data &&
        imagesPropertyList.map((img, i) => (
          <div className={cls.pListItem} key={i}>
            <img src={img} alt="" className={cls.pListImg} />

            <div className={cls.pListTitles}>
              <h1>{data[i]?.type}</h1>

              <h2>
                {data[i]?.count} {data[i]?.type}
              </h2>
            </div>
          </div>
        ))}
    </div>
  );
};
