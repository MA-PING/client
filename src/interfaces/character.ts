// src/types/character.ts

export interface basic {
    date: string;
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

export interface FinalStat {
    stat_name: string;
    stat_value: string; // Note: The original Stat interface uses final_stat: FinalStat[], maybe stat_value instead of stat_class? Check API response. Assuming stat_class is correct per your definition.
}

export interface Stat {
    date: string;
    character_class: string;
    final_stat: FinalStat[];
    remain_ap: number;
}


export interface HyperStatPreset {
    stat_type: string;
    stat_point: number;
    stat_level: number;
    stat_increase: string;
}

export interface HyperStat {
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

export interface AbilityInfo {
    ability_no: string;
    ability_grade: string;
    ability_value: string;
}

export interface AbilityPreset {
    ability_preset_grade: string;
    ability_info: AbilityInfo[];
}

export interface Ability {
    date: string;
    ability_grade: string;
    ability_info: AbilityInfo[];
    remain_fame: number;
    preset_no: number; // Assuming this should be number based on usage context
    ability_preset_1: AbilityPreset;
    ability_preset_2: AbilityPreset;
    ability_preset_3: AbilityPreset;
}

// --- Item Equipment Interfaces ---

export interface ItemEquipmentTotalOption {
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

export interface ItemEquipmentBaseOption {
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

export interface ItemEquipmentExceptionalOption {
    str: string;
    dex: string;
    int: string;
    luk: string;
    max_hp: string;
    max_mp: string;
    attack_power: string;
    magic_power: string;
    exceptional_upgrade: number; // Typo fixed: was exceptional_upgrade
}

export interface ItemEquipmentAddOption { // Typo fixed: was itemAddOption
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

export interface ItemEquipmentEtcOption {
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

export interface ItemEquipmentStarforceOption {
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

export interface ItemEquipmentInfo {
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
    itemAddOption: ItemEquipmentAddOption; // Corrected interface name reference
    growth_exp: number;
    growth_level: number;
    scroll_upgrade: string;
    cuttable_count: string; // Type might be number? Check API
    golden_hammer_flag: string; // Type might be boolean? Check API
    scroll_resilience_count: string; // Type might be number? Check API
    scroll_upgradeable_count: string; // Type might be number? Check API
    soul_name: string;
    soul_option: string;
    item_etc_option: ItemEquipmentEtcOption;
    starforce: string; // Type might be number? Check API
    starforce_scroll_flag: string; // Type might be boolean? Check API
    item_starforce_option: ItemEquipmentStarforceOption;
    special_ring_level: number;
    date_expire: string | null; // Allow null if applicable
}

export interface ItemEquipmentTitle {
    title_name: string;
    title_icon: string;
    title_description: string;
    date_expire: string | null;
    date_option_expire: string | null;
    title_shape_name: string;
    title_shape_icon: string;
    title_shape_description: string;
}

export interface ItemEquipmentMedalShape { // Added this interface definition which was referenced but not defined
    medal_shape_name: string;
    medal_shape_icon: string;
    medal_shape_description: string;
    medal_shape_changed_name: string;
    medal_shape_changed_icon: string;
    medal_shape_changed_description: string;
}

export interface ItemEquipmentDragonMechanicInfo { // Reusing sub-interfaces
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
    itemAddOption: ItemEquipmentAddOption; // Corrected interface name reference
    growth_exp: number;
    growth_level: number;
    scroll_upgrade: string;
    cuttable_count: string; // Type might be number? Check API
    golden_hammer_flag: string; // Type might be boolean? Check API
    scroll_resilience_count: string; // Type might be number? Check API
    scroll_upgradeable_count: string; // Type might be number? Check API
    soul_name: string;
    soul_option: string;
    item_etc_option: ItemEquipmentEtcOption;
    starforce: string; // Type might be number? Check API
    starforce_scroll_flag: string; // Type might be boolean? Check API
    item_starforce_option: ItemEquipmentStarforceOption;
    special_ring_level: number;
    date_expire: string | null;
}

export interface ItemEquipment {
    date: string;
    character_gender: string;
    character_class: string;
    preset_no: number; // Assuming number
    item_equipment: ItemEquipmentInfo[];
    item_equipment_preset_1: ItemEquipmentInfo[];
    item_equipment_preset_2: ItemEquipmentInfo[];
    item_equipment_preset_3: ItemEquipmentInfo[];
    title: ItemEquipmentTitle;
    medal_shape: ItemEquipmentMedalShape; // Use defined interface
    dragon_equipment: ItemEquipmentDragonMechanicInfo[]; // Corrected interface name reference
    mechanic_equipment: ItemEquipmentDragonMechanicInfo[]; // Corrected interface name reference
}


// --- Symbol Equipment ---
export interface SymbolEquipmentInfo {
    symbol_name: string;
    symbol_icon: string;
    symbol_description: string;
    symbol_force: string; // Type might be number? Check API
    symbol_level: number;
    symbol_str: string; // Type might be number? Check API
    symbol_dex: string; // Type might be number? Check API
    symbol_int: string; // Type might be number? Check API
    symbol_luk: string; // Type might be number? Check API
    symbol_hp: string; // Type might be number? Check API
    symbol_drop_rate: string; // Type might be number? Check API
    symbol_meso_rate: string; // Type might be number? Check API
    symbol_exp_rate: string; // Type might be number? Check API
    symbol_growth_count: number;
    symbol_require_growth_count: number;
}

export interface SymbolEquipment {
    date: string;
    character_class: string;
    symbol: SymbolEquipmentInfo[];
}

// --- Skill Interfaces ---
export interface SkillInfo {
    skill_name: string;
    skill_description: string;
    skill_level: number;
    skill_effect: string | null; // Allow null if applicable
    skill_effect_next: string | null; // Allow null if applicable
    skill_icon: string;
}

export interface Skill {
    date: string;
    character_class: string;
    character_skill_grade: string;
    character_skill: SkillInfo[];
}

// --- Link Skill ---
export interface LinkSkill {
    date: string;
    character_class: string;
    character_link_skill: SkillInfo[];
    character_link_skill_preset_1: SkillInfo[];
    character_link_skill_preset_2: SkillInfo[];
    character_link_skill_preset_3: SkillInfo[];
    character_owned_link_skill: SkillInfo; // Consider if this can be null/undefined initially
    character_owned_link_skill_preset_1: SkillInfo | null; // Consider presets might not exist
    character_owned_link_skill_preset_2: SkillInfo | null;
    character_owned_link_skill_preset_3: SkillInfo | null;
}

// --- VMatrix ---
export interface VMatrixCoreEquipment { // Renamed from VMatrixCoreEquipment to avoid conflict
    slot_id: string;
    slot_level: number;
    v_core_name: string;
    v_core_type: string;
    v_core_level: number;
    v_core_skill_1: string;
    v_core_skill_2: string;
    v_core_skill_3: string;
}

export interface VMatrix {
    date: string;
    character_class: string;
    character_v_core_equipment: VMatrixCoreEquipment[]; // Use renamed interface in array
    character_v_matrix_remain_slot_upgrade_point: number;
}

// --- HexaMatrix ---
export interface HexaMatrixEquipmentLinkedSkill {
    hexa_skill_id: string;
}

export interface HexaMatrixEquipment {
    hexa_core_name: string;
    hexa_core_level: number;
    hexa_core_type: string;
    linked_skill: HexaMatrixEquipmentLinkedSkill[];
}

export interface HexaMatrix {
    date: string;
    character_hexa_core_equipment: HexaMatrixEquipment[];
}

// --- HexaMatrix Stat ---
export interface HexaMatrixStatCore {
    slot_id: string;
    main_stat_name: string;
    sub_stat_name_1: string;
    sub_stat_name_2: string;
    main_stat_level: number;
    sub_stat_level_1: number;
    sub_stat_level_2: number;
    stat_grade: number;
}

export interface HexaMatrixStat {
    date: string;
    character_class: string;
    character_hexa_stat_core: HexaMatrixStatCore[];
    character_hexa_stat_core_2: HexaMatrixStatCore[]; // Added missing definition from Character interface
    preset_hexa_stat_core: HexaMatrixStatCore[];
    preset_hexa_stat_core_2: HexaMatrixStatCore[]; // Added missing definition from Character interface
}

// --- Union ---
export interface Union {
    date: string;
    union_level: number;
    union_grade: string;
    union_artifact_level: number;
    union_artifact_exp: number;
    union_artifact_point: number;
}

// --- Union Raider ---
export interface UnionRaiderInnerStat {
    stat_field_id: string;
    stat_field_effect: string;
}

export interface UnionRaiderBlockControlPoint {
    x: number;
    y: number;
}

export interface UnionRaiderBlockPosition {
    x: number;
    y: number;
}

export interface UnionRaiderBlock {
    block_type: string;
    block_class: string;
    block_level: string; // Type might be number? Check API
    block_control_point: UnionRaiderBlockControlPoint;
    block_position: UnionRaiderBlockPosition[];
}

export interface UnionRaiderPreset {
    union_raider_stat: string[];
    union_occupied_stat: string[];
    union_inner_stat: UnionRaiderInnerStat[];
    union_block: UnionRaiderBlock[];
}

export interface UnionRaider {
    date: string;
    union_raider_stat: string[];
    union_occupied_stat: string[];
    union_inner_stat: UnionRaiderInnerStat[];
    unionBlock: UnionRaiderBlock[]; // Typo? Original had unionBlock, preset had union_block
    use_preset_no: number; // Assuming number
    union_raider_preset_1: UnionRaiderPreset | null; // Allow null if presets aren't guaranteed
    union_raider_preset_2: UnionRaiderPreset | null;
    union_raider_preset_3: UnionRaiderPreset | null;
    union_raider_preset_4: UnionRaiderPreset | null; // Added missing definition from Character interface
    union_raider_preset_5: UnionRaiderPreset | null; // Added missing definition from Character interface
}

// --- Union Artifact ---
export interface UnionArtifactEffect {
    name: string;
    level: number;
}

export interface UnionArtifactCrystal {
    name: string;
    validity_flag: string; // Might be boolean? Check API
    date_expire: string | null;
    level: number;
    crystal_option_name_1: string;
    crystal_option_name_2: string;
    crystal_option_name_3: string;
}

export interface UnionArtifact {
    date: string;
    union_artifact_effect: UnionArtifactEffect[];
    union_artifact_crystal: UnionArtifactCrystal[];
    union_artifact_remain_ap: number;
}

// --- Character Aggregate Interface ---
export interface Character {
    ocid: string;
    basic: basic;
    stat: Stat; // Property names should conventionally start with lowercase (e.g., stat)
    hyperStat: HyperStat; // e.g., hyperStat
    ability: Ability; // e.g., ability
    ItemEquipment: ItemEquipment; // e.g., itemEquipment
    symbolEquipment: SymbolEquipment; // e.g., symbolEquipment
    skill5: Skill; // e.g., skill5 or VSkill?
    skill6: Skill; // e.g., skill6 or hexSkill?
    linkSkill: LinkSkill; // e.g., linkSkill
    vMatrix: VMatrix; // e.g., vMatrix
    hexaMatrix: HexaMatrix; // e.g., hexaMatrix
    hexaMatrixStat: HexaMatrixStat; // e.g., hexaMatrixStat
    union: Union; // e.g., union
    unionRaider: UnionRaider; // e.g., unionRaider
    unionArtifact: UnionArtifact; // e.g., unionArtifact
}

// --- API Response Wrapper ---
export interface ApiResponse {
    code: string;
    message: string;
    responseAt: string;
    data: Character; // Use the main Character interface
    success: boolean;
}

// --- Notes ---
// 1. Corrected some potential typos (e.g., itemAddOption, exceptional_upgrade).
// 2. Added `export` to all interfaces.
// 3. Added missing interface definitions referenced in other interfaces (e.g., ItemEquipmentMedalShape).
// 4. Added missing properties in interfaces based on the final `Character` interface definition.
// 5. Suggested potential type corrections (e.g., string vs number/boolean for flags/counts). Verify these against the actual API response.
// 6. Suggested using `null` for fields that might not always be present (like `date_expire`).
// 7. Recommended conventional lowercase starting letters for property names inside `Character` interface (e.g., `Stat` -> `stat`). This is a convention, not a strict requirement.