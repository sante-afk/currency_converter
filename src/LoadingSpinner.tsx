import loading from './assets/loading.gif'; 

const LoadingSpinner = () => {
  return (
    <div>
      <img src={loading} alt="Loading" className='loading'/> 
    </div>
  );
};

export default LoadingSpinner;
