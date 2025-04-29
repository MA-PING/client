import Header from "@/component/header";
import Footer from "@/component/footer";
import CharacterInfo from "@/component/search/characterInfo";
import CharacterDetails from "@/component/search/characterDetails";
import styles from "../../../styles/search/character.module.css"

interface basic {
    data: string;
    character_name: string;
    world_name: string;
    character_gender: string;
    character_class: string;
    character_class_level: string;
    character_level: number;
    character_exp: number;
    character_exp_rate: string;
    character_guild_name: string;
    character_image: string;
    character_date_create: string;
    access_flag: string;
    liberation_quest_clear_flag: string;
}

interface Stat {
    date: string;
    character_class: string;
    final_stat: FinalStat[];
    remain_ap:number;
}

interface FinalStat {
    stat_name: string;
    stat_class: string;
}

interface HyperStat {
    date: string;
    character_class: string;
    use_preset_no: string;
    use_available_hyper_stat: number;
    hyper_stat_preset_1: HyperStatPreset[];
    hyper_stat_preset_1_remain_point: number;
    hyper_stat_preset_2: HyperStatPreset[];
    hyper_stat_preset_2_remain_point: number;
    hyper_stat_preset_3: HyperStatPreset[];
    hyper_stat_preset_3_remain_point: number;
}

interface HyperStatPreset {
    stat_type: string;
    stat_point: number;
    stat_level: number;
    stat_increase: string;
}

interface Ability {
    date: string;
    ability_grade: string;
    ability_info: AbilityInfo[];
    remain_fame: number;
    preset_no: number;
    ability_preset_1: AbilityPreset;
    ability_preset_2: AbilityPreset;
    ability_preset_3: AbilityPreset;
}

interface AbilityInfo {
    ability_no: string;
    ability_grade: string;
    ability_value: string;
}

interface AbilityPreset {
    ability_preset_grade: string;
    ability_info: AbilityInfo[];
}

interface ItemEquipment {
    date: string;
    character_gender: string;
    character_class: string;
    preset_no: number;
    item_equipment: ItemEquipmentInfo[];
    item_equipment_preset_1: ItemEquipmentInfo[];
    item_equipment_preset_2: ItemEquipmentInfo[];
    item_equipment_preset_3: ItemEquipmentInfo[];
    title: ItemEquipmentTitle;
    medal_shape: ItemEquipmentMedalShape;
    dragon_equipment: ItemEquipmentDragonMechanicInfo[];
    mechanic_equipment: ItemEquipmentDragonMechanicInfo[];
}

interface ItemEquipmentInfo {
    item_equipment_part: string;
    item_equipment_slot: string;
    item_name: string;
    item_icon: string;
    item_description: string;
    item_shape_name: string;
    item_shape_icon: string;
    item_gender: string;
    item_total_option: ItemEquipmentTotalOption;
    item_base_option: ItemEquipmentBaseOption;
    potential_option_grade: string;
    additional_potential_option_grade: string;
    potential_option_1: string;
    potential_option_2: string;
    potential_option_3: string;
    additional_potential_option_1: string;
    additional_potential_option_2: string;
    additional_potential_option_3: string;
    equipment_level_increase: number;
    item_exceptional_option: ItemEquipmentExceptionalOption;
    itemAddOption: ItemEquipmentAddOption;
    growth_exp: number;
    growth_level: number;
    scroll_upgrade: string;
    cuttable_count: string;
    golden_hammer_flag: string;
    scroll_resilience_count: string;
    scroll_upgradeable_count: string;
    soul_name: string;
    soul_option: string;
    item_etc_option: ItemEquipmentEtcOption;
    starforce: string;
    starforce_scroll_flag: string;
    item_starforce_option: ItemEquipmentStarforceOption;
    special_ring_level: number;
    date_expire: string;
}

interface ItemEquipmentTotalOption {
    str: string;
    dex: string;
    int: string;
    luk: string;
    max_hp: string;
    max_mp: string;
    attack_power: string;
    magic_power: string;
    armor: string;
    speed: string;
    jump: string;
    boss_damage: string;
    ignore_monster_armor: string;
    all_stat: string;
    damage: string;
    equipment_level_decrease: number;
    max_hp_rate: string;
    max_mp_rate: string;
}

interface ItemEquipmentBaseOption {
    str: string;
    dex: string;
    int: string;
    luk: string;
    max_hp: string;
    max_mp: string;
    attack_power: string;
    magic_power: string;
    armor: string;
    speed: string;
    jump: string;
    boss_damage: string;
    ignore_monster_armor: string;
    all_stat: string;
    max_hp_rate: string;
    max_mp_rate: string;
    base_equipment_level: number;
}

interface ItemEquipmentExceptionalOption {
    str: string;
    dex: string;
    int: string;
    luk: string;
    max_hp: string;
    max_mp: string;
    attack_power: string;
    magic_power: string;
    exceptional_upgrade: number;
}

interface ItemEquipmentAddOption {
    str: string;
    dex: string;
    int: string;
    luk: string;
    max_hp: string;
    max_mp: string;
    attack_power: string;
    magic_power: string;
    armor: string;
    speed: string;
    jump: string;
    boss_damage: string;
    damage: string;
    all_stat: string;
    equipment_level_decrease: number;
}

interface ItemEquipmentEtcOption {
    str: string;
    dex: string;
    int: string;
    luk: string;
    max_hp: string;
    max_mp: string;
    attack_power: string;
    magic_power: string;
    armor: string;
    speed: string;
    jump: string;
}

interface ItemEquipmentStarforceOption {
    str: string;
    dex: string;
    int: string;
    luk: string;
    max_hp: string;
    max_mp: string;
    attack_power: string;
    magic_power: string;
    armor: string;
    speed: string;
    jump: string;
}

interface ItemEquipmentTitle {
    title_name: string;
    title_icon: string;
    title_description: string;
    date_expire: string;
    date_option_expire: string;
    title_shape_name: string;
    title_shape_icon: string;
    title_shape_description: string;
}

interface ItemEquipmentMedalShape {
    medal_shape_name: string;
    medal_shape_icon: string;
    medal_shape_description: string;
    medal_shape_changed_name: string;
    medal_shape_changed_icon: string;
    medal_shape_changed_description: string;
}

interface ItemEquipmentDragonMechanicInfo {
    item_equipment_part: string;
    item_equipment_slot: string;
    item_name: string;
    item_icon: string;
    item_description: string;
    item_shape_name: string;
    item_shape_icon: string;
    item_gender: string;
    item_total_option: ItemEquipmentTotalOption;
    item_base_option: ItemEquipmentBaseOption;
    equipment_level_increase: number;
    item_exceptional_option: ItemEquipmentExceptionalOption;
    itemAddOption: ItemEquipmentAddOption;
    growth_exp: number;
    growth_level: number;
    scroll_upgrade: string;
    cuttable_count: string;
    golden_hammer_flag: string;
    scroll_resilience_count: string;
    scroll_upgradeable_count: string;
    soul_name: string;
    soul_option: string;
    item_etc_option: ItemEquipmentEtcOption;
    starforce: string;
    starforce_scroll_flag: string;
    item_starforce_option: ItemEquipmentStarforceOption;
    special_ring_level: number;
    date_expire: string;
}

interface SymbolEquipment {
    date: string;
    character_class: string;
    symbol: SymbolEquipmentInfo[];
}

interface SymbolEquipmentInfo {
    symbol_name: string;
    symbol_icon: string;
    symbol_description: string;
    symbol_force: string;
    symbol_level: number;
    symbol_str: string;
    symbol_dex: string;
    symbol_int: string;
    symbol_luk: string;
    symbol_hp: string;
    symbol_drop_rate: string;
    symbol_meso_rate: string;
    symbol_exp_rate: string;
    symbol_growth_count: number;
    symbol_require_growth_count: number;
}

interface Skill {
    date: string;
    character_class: string;
    character_skill_grade: string;
    character_skill: SkillInfo[];
}

interface SkillInfo {
    skill_name: string;
    skill_description: string;
    skill_level: number;
    skill_effect: string;
    skill_effect_next: string;
    skill_icon: string;
}

interface LinkSkill {
    date: string;
    character_class: string;
    character_link_skill: SkillInfo[];
    character_link_skill_preset_1: SkillInfo[];
    character_link_skill_preset_2: SkillInfo[];
    character_link_skill_preset_3: SkillInfo[];
    character_owned_link_skill: SkillInfo;
    character_owned_link_skill_preset_1: SkillInfo;
    character_owned_link_skill_preset_2: SkillInfo;
    character_owned_link_skill_preset_3: SkillInfo;
}

interface VMatrix {
    date: string;
    character_class: string;
    character_v_core_equipment:VMatrixCoreEquipment[];
    character_v_matrix_remain_slot_upgrade_point: number;
}

interface VMatrixCoreEquipment {
    slot_id: string;
    slot_level: number;
    v_core_name: string;
    v_core_type: string;
    v_core_level: number;
    v_core_skill_1: string;
    v_core_skill_2: string;
    v_core_skill_3: string;
}

interface HexaMatrix {
    date: string;
    character_hexa_core_equipment: HexaMatrixEquipment[];
}

interface HexaMatrixEquipment {
    hexa_core_name: string;
    hexa_core_level: number;
    hexa_core_type: string;
    linked_skill: HexaMatrixEquipmentLinkedSkill[];
}

interface HexaMatrixEquipmentLinkedSkill {
    hexa_skill_id: string;
}

interface HexaMatrixStat {
    date: string;
    character_class: string;
    character_hexa_stat_core: HexaMatrixStatCore[];
    character_hexa_stat_core_2: HexaMatrixStatCore[];
    preset_hexa_stat_core: HexaMatrixStatCore[];
    preset_hexa_stat_core_2: HexaMatrixStatCore[];
}

interface HexaMatrixStatCore {
    slot_id: string;
    main_stat_name: string;
    sub_stat_name_1: string;
    sub_stat_name_2: string;
    main_stat_level: number;
    sub_stat_level_1: number;
    sub_stat_level_2: number;
    stat_grade: number;
}

interface Union {
    date: string;
    union_level: number;
    union_grade: string;
    union_artifact_level: number;
    union_artifact_exp: number;
    union_artifact_point: number;
}

interface UnionRaider {
    date: string;
    union_raider_stat: string[];
    union_occupied_stat: string[];
    union_inner_stat: UnionRaiderInnerStat[];
    unionBlock: UnionRaiderBlock[];
    use_preset_no: number;
    union_raider_preset_1: UnionRaiderPreset;
    union_raider_preset_2: UnionRaiderPreset;
    union_raider_preset_3: UnionRaiderPreset;
    union_raider_preset_4: UnionRaiderPreset;
    union_raider_preset_5: UnionRaiderPreset;
}

interface UnionRaiderInnerStat {
    stat_field_id: string;
    stat_field_effect: string;
}

interface UnionRaiderBlock {
    block_type: string;
    block_class: string;
    block_level: string;
    block_control_point: UnionRaiderBlockControlPoint;
    block_position: UnionRaiderBlockPosition[];
}

interface UnionRaiderBlockControlPoint {
    x: number;
    y: number;
}

interface UnionRaiderBlockPosition {
    x: number;
    y: number;
}

interface UnionRaiderPreset {
    union_raider_stat: string[];
    union_occupied_stat: string[];
    union_inner_stat: UnionRaiderInnerStat[];
    union_block: UnionRaiderBlock[];
}

interface UnionArtifact {
    date: string;
    union_artifact_effect: UnionArtifactEffect[];
    union_artifact_crystal: UnionArtifactCrystal[];
    union_artifact_remain_ap: number;
}

interface UnionArtifactEffect {
    name: string;
    level: number;
}

interface UnionArtifactCrystal {
    name: string;
    validity_flag: string;
    date_expire: string;
    level: number;
    crystal_option_name_1: string;
    crystal_option_name_2: string;
    crystal_option_name_3: string;
}

interface Character {
    ocid: string;
    basic: basic;
    Stat: Stat;
    HyperStat: HyperStat;
    Ability: Ability;
    ItemEquipment: ItemEquipment;
    SymbolEquipment: SymbolEquipment;
    Skill5: Skill;
    Skill6: Skill;
    LinkSkill: LinkSkill;
    VMatrix: VMatrix;
    HexaMatrix: HexaMatrix;
    HexaMatrixStat: HexaMatrixStat;
    Union: Union;
    UnionRaider: UnionRaider;
    UnionArtifact: UnionArtifact;
}

interface ApiResponse {
    code: string;
    message: string;
    responseAt: string;
    data: Character;
    success: boolean;
}

async function getCharacter(name:string): Promise<Character | boolean> {
    try {

        const response = await fetch('https://api.ma-ping.com/api/v1/character?characterName=' + name, {
            next: {
                revalidate: 60000,
            },
        });

        if (!response.ok) {
            return response.ok;
        }


        const data: ApiResponse = await response.json();
        if (!data || !data.data) {
            return false;
        }

        return data.data;
    } catch (error) {
        console.error('캐릭터 정보 가져오기 오류:', error);
        return false;
    }
}


export default async function Home({params,}: {
    params: Promise<{ name: string }>
}) {
    const { name } = await params
    const Character= await getCharacter(name);
    if (!Character) {
        console.log('캐릭터 없음');
    }
    return (
        <div>
            <Header/>
            <div className={styles.div}>
                <CharacterInfo characterName={name}/>
                <CharacterDetails/>
            </div>
            <Footer/>
        </div>)
}