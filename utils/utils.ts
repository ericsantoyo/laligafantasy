
export const teams = [
  { name: "Deportivo Alavés", slug: "d-alaves", id: 21 },
  { name: "UD Almería", slug: "ud-almeria", id: 1 },
  { name: "Athletic Club", slug: "athletic-club", id: 3 },
  { name: "Atlético de Madrid", slug: "atletico-de-madrid", id: 2 },
  { name: "FC Barcelona", slug: "fc-barcelona", id: 4 },
  { name: "Real Betis", slug: "real-betis", id: 5 },
  { name: "Cádiz CF", slug: "cadiz-cf", id: 162 },
  { name: "RC Celta", slug: "rc-celta", id: 6 },
  { name: "Getafe CF", slug: "getafe-cf", id: 9 },
  { name: "Girona FC", slug: "girona-fc", id: 28 },
  { name: "Granada CF", slug: "granada-cf", id: 10 },
  { name: "UD Las Palmas", slug: "ud-las-palmas", id: 31 },
  { name: "RCD Mallorca", slug: "rcd-mallorca", id: 33 },
  { name: "C.A. Osasuna", slug: "c-a-osasuna", id: 13 },
  { name: "Rayo Vallecano", slug: "rayo-vallecano", id: 14 },
  { name: "Real Madrid", slug: "real-madrid", id: 15 },
  { name: "Real Sociedad", slug: "real-sociedad", id: 16 },
  { name: "Sevilla FC", slug: "sevilla-fc", id: 17 },
  { name: "Valencia CF", slug: "valencia-cf", id: 18 },
  { name: "Villarreal CF", slug: "villarreal-cf", id: 20 },
];

export function slugById(teamID) {
  const team = teams.find((team) => team.id === teamID);
  const slug = team ? team.slug : "Not Found";
  return slug;
}

export function slugByName({ name }) {
  const team = teams.find((team) => team.name.replace(/\s/g, "") === name.replace(/\s/g, ""));
  const slug = team ? team.slug : "Not Found";

  return slug;
}
