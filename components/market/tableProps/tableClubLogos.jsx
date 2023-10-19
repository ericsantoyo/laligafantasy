import Image from "next/image";

export default (props) => {
  const cellValue = props.value;

  const teams = [
    { "name": "Deportivo Alavés", "slug": "d-alaves" },
    { "name": "UD Almería", "slug": "ud-almeria" },
    { "name": "Athletic Club", "slug": "athletic-club" },
    { "name": "Atlético de Madrid", "slug": "atletico-de-madrid" },
    { "name": "FC Barcelona", "slug": "fc-barcelona" },
    { "name": "Real Betis", "slug": "real-betis" },
    { "name": "Cádiz CF", "slug": "cadiz-cf" },
    { "name": "RC Celta", "slug": "rc-celta" },
    { "name": "Getafe CF", "slug": "getafe-cf" },
    { "name": "Girona FC", "slug": "girona-fc" },
    { "name": "Granada CF", "slug": "granada-cf" },
    { "name": "UD Las Palmas", "slug": "ud-las-palmas" },
    { "name": "RCD Mallorca", "slug": "rcd-mallorca" },
    { "name": "C.A. Osasuna", "slug": "c-a-osasuna" },
    { "name": "Rayo Vallecano", "slug": "rayo-vallecano" },
    { "name": "Real Madrid", "slug": "real-madrid" },
    { "name": "Real Sociedad", "slug": "real-sociedad" },
    {"name": "Sevilla FC", "slug": "sevilla-fc" },
    { "name": "Valencia CF", "slug": "valencia-cf" },
    { "name": "Villarreal CF", "slug": "villarreal-cf" }
  ]

  function slugById({ name }) {
    const team = teams.find((team) => team.name === name);
    const slug = team ? team.slug : 'Not Found'; // Display "Not Found" if the ID is not found
  
    return slug;
  }

  return (
    <div className="flex justify-center items-center h-full">
      <Image 
        className='h-5 w-auto ' 
        src={`/teamLogos/${slugById({ name: cellValue })}.png`}
        alt="Logo" 
        width={20}
        height={20}
        
      />
    </div>
   
  );
};