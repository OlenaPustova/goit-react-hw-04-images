import { TailSpin } from 'react-loader-spinner';

import s from './Loader.module.scss';

function Loader() {
  return (
    <div className={s.loader}>
      <TailSpin height="200" width="200" color="#3f51b5" ariaLabel="loading" />
    </div>
  );
}

export default Loader;
