const TextShine = ( { name , change } ) => {
    return (
      <span className={`inline-flex animate-text-gradient bg-gradient-to-r from-[#b2a8fd] via-[#8678f9] to-[#c7d2fe] bg-[200%_auto] bg-clip-text text-transparent pb-3 md:text-5xl text-3xl ${change}`}>
        {name}
      </span>
    );
  };

  export default TextShine;