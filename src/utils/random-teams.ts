import Team from "../models/team";

const shuffle = (arr: any[]) => {
    return [...arr].sort(() => .5 - Math.random());
}

const createRandomTeams = (arr: any[], teamSize: number) => {
    const shuffled = shuffle(arr);
    const result: Team[] = []
    for (let i = 0; i < shuffled.length; i++) {
        let teamIndex = Math.floor(i / teamSize);
        if (shuffled.length - i < teamSize && shuffled.length % i !== 0) {
            teamIndex = i % teamSize;
        }
        if (!result[teamIndex]) {
            result[teamIndex] = { names: [], points: 0}
        }
        result[teamIndex].names.push(shuffled[i]);
    }

    return result;
    
}

export default createRandomTeams;