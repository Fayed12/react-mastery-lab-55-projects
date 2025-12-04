import style from './loadingSkilton.module.css';

const LoadingSkilton = () => {
    return (
        <div className={style.container}>
            <h1 className={style.title}>Our Menu</h1>
            <div className={style.grid}>
                {[...Array(9)].map((_, index) => (
                    <div key={index} className={style.skeletonCard}>
                        <div className={style.shimmer}></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LoadingSkilton;
