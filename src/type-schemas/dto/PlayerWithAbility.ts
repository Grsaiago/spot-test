export interface PlayerWithAbilitiy {
	id: string;
	name: string;
	nickname: string | null;
	strength: number;
	speed: number;
	dribble?: number | null;
	createdAt: Date;
	updatedAt: Date;
	lastAbilityUpdate: Date;
}
