import voterModel from '../../models/voter.model';
import { IVoter } from '../types/voterTypes';
import { Project , ProjectVotes , TotalVotes ,QuadraticVotes , MatchingPoolFactors } from '../types/voterTypes';

const calculateVotes = async (
    _: any,
    { eventUuid }: { eventUuid: string }
): Promise<Array<{ title: string; QvRatio: number; totalVotes: number }>> => {
    try {
        const voters: IVoter[] = await voterModel.find({ event_uuid: eventUuid });

        if (!voters || voters.length === 0) {
            throw new Error('No voters found for the given event uuid');
        }

        const projects: Project[] = Object.values(voters[0].vote_data);

        const projectVotes: ProjectVotes = {};
        const totalVotes: TotalVotes = {};
        const quadraticVotes: QuadraticVotes = {};

        projects.forEach((project) => {
            projectVotes[project.title] = 0;
            totalVotes[project.title] = 0;
        });

        voters.forEach((voter) => {
            projects.forEach((project) => {
                const votes = voter.vote_data.find((p : Project ) => p.title === project.title)?.votes || 0;
                projectVotes[project.title] += Math.sqrt(votes);
                totalVotes[project.title] += votes;
            });
        });

        projects.forEach((project) => {
            quadraticVotes[project.title] = Math.pow(projectVotes[project.title], 2);
        });

        const totalQuadraticVotesSquared = Object.values(quadraticVotes).reduce((acc, value) => acc + value, 0);

        const matchingPoolFactors: MatchingPoolFactors = {};
        projects.forEach((project) => {
            matchingPoolFactors[project.title] = quadraticVotes[project.title] / totalQuadraticVotesSquared;
        });

        const result: Array<{ title: string; QvRatio: number; totalVotes: number }> = [];
        projects.forEach((project) => {
            result.push({
                title: project.title,
                QvRatio: matchingPoolFactors[project.title],
                totalVotes: totalVotes[project.title],
            });
        });

        return result;
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
};

const voterResolvers = {
    Query: {
        calculateVotes,
    },
    Mutation: {},
};

export default voterResolvers;
