import { IScenario, IStory } from "@/shared/types/api.ts";
import { isChallenge, isReturnPack, isSideContent } from "@/shared/store/features/stories/criteria.ts";
import {isNotNil, propEq} from "ramda";
import {removePunctuation} from "@/shared/lib/features/util/common.ts";
import { IDatabase } from "arkham-divider-data/build/types/database";

const getChallengeNumber = (story: IStory) => {
    return (([
        'rod', 'aon', 'bad', 'btb', 'rtr',
        'otr', 'ltr', 'ptr', 'rop', 'hfa', 'pap', 'aof', 'enc'
    ].indexOf(story.code) + 1) || '').toString();
};

const getStandaloneNumber = (story: IStory) => {
    return (([
        'cotr', 'coh', 'lol', 'guardians', 'hotel', 'blob',
        'wog', 'mtt', 'fof', 'blbe', 'tmg', 'film_fatale',
    ].indexOf(story.code) + 1) || '').toString();
};

const getReturnToNumber = (story: IStory) => {
    const number = (([
        'rtnotz', 'rtdwl', 'rtptc', 'rttfa', 'rttcu', 'zrttde', 'zrttic'
    ].indexOf(story.code) + 1) || '').toString();
    return number ? number + 'B' : number;
};

export const getStoryNumber = (story: IStory) => {
    return isChallenge(story) ? getChallengeNumber(story) :
        isSideContent(story) ? getStandaloneNumber(story) :
        isReturnPack(story) ? getReturnToNumber(story) :
        (story.position || '').toString();
};

const scenarioNumbers: Record<string, string> = {
    // tcu
    disappearance_at_the_twilight_estate: '0',
    return_to_disappearance_at_the_twilight_estate: '0',
    // eoe
    ice_and_death: '1',
    the_heart_of_madness: '4',
    fatal_mirage: '5',
    // tfa
    heart_of_the_elders: '5',
    return_to_heart_of_the_elders: '5',
};

const formatText = (text: string) => removePunctuation(text).toLowerCase();

const filterStoryScenarios = (story: IStory, encounterSets: IDatabase.EncounterSet[]) => {
    const encounters = story.encounter_sets.map((code) => {
        return encounterSets.find(propEq(code, 'code'));
    }).filter(isNotNil).map((encounter) => {
        return formatText(encounter.name.toLowerCase());
    })
    return (story.scenarios || []).filter((scenario) => {
        return encounters.includes(formatText(scenario.scenario_name));
    });
};

export const getScenarioNumber = (code: string, scenario?: IScenario, story?: IStory, encounterSets?: IDatabase.EncounterSet[]) => {
    const override = scenarioNumbers[code];
    if (override !== undefined) { return override; }
    if (scenario?.number !== undefined) {
        return scenario.number + (scenario.number_text !== undefined ? scenario.number_text.replace(/^[IVX]+-?/, '') : '');
    }
    return story && !isChallenge(story) && !isSideContent(story) && scenario && encounterSets ? ((filterStoryScenarios(story, encounterSets).indexOf(scenario) + 1) || '').toString() : '';
};