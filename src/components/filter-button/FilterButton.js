const FilterButton = ({ fillterMedia, setFillterMedia, fillterText }) => {
    const fillterStatus = fillterMedia[fillterText];
    
    return (
      <button
        onClick={() => setFillterMedia({ ...fillterMedia, [fillterText]: !fillterStatus })}
        className={`btn btn-square ${!fillterStatus && 'btn-outline'} btn-primary w-full text-xl font-black`}
      >
        {fillterText}
      </button>
    );
  };
  
  export default FilterButton;
  