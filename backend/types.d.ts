/** Expected structure of ProPublica API secrets stored in AWS secrets by the admin. */
interface ProPublicaSecret {
	ProPublicaApiKey: string;
	ProPublicaApiUrl: string;
}

/** Response from ProPublica API */
interface ProPublicaResponse {
	status: string;
	copyright: string;
	results: ProPublicaResponseResults[];
}

/** The results attribute of a response from the ProPublica API. */
interface ProPublicaResponseResults {
	congress?: 115 | 116 | 117;
	chamber?: 'House' | 'Senate';
	date?: string;
	id?: string;
	member_uri?: string;
	name?: string;
	num_results?: number;
	offset?: number;
	subject?: string;
	bills?: ProPublicaBill[];
}

/** Attributes of a bill from the results of a response from the ProPublica API. */
interface ProPublicaBill {
	bill_id?: string;
	bill_slug?: string;
	congress?: string;
	bill?: string;
	bill_type?: string;
	number?: string;
	bill_uri?: string;
	title?: string;
	short_title?: string;
	sponsor_title?: string;
	sponsor_id?: string;
	sponsor_name?: string;
	sponsor_state?: string;
	sponsor_party?: string;
	sponsor_uri?: string;
	gpo_pdf_uri?: string;
	congressdotgov_url?: string;
	govtrack_url?: string;
	introduced_date?: string;
	active?: boolean;
	house_passage?: string | null;
	senate_passage?: string | null;
	enacted?: string | null;
	vetoed?: string | null;
	cosponsors?: number;
	cosponsors_by_party?: Record<string, number>;
	withdrawn_cosponsors?: number;
	primary_subject?: string;
	committees?: string;
	committee_codes?: string[];
	subcommittee_codes?: string[];
	summary?: string;
	summary_short?: string;
	latest_major_action?: string;
	versions?: ProPublicaBillVersion[];
	actions?: ProPublicaBillAction[];
	ammendments?: ProPublicaBillAmmendments[];
	subjects?: ProPublicaBillSubjects[];
}

interface ProPublicaBillVersion {
	status: string;
	title: string;
	url: string;
	congressdotgov_url: string;
}

interface ProPublicaBillAction {
	id: number;
	chamber: 'House' | 'Senate';
	action_type: string;
	datetime: string;
	description: string;
}

interface ProPublicaBillAmmendments {
	amendment_number: string;
	slug: string;
	sponsor_title: string;
	sponsor: string;
	sponsor_id: string;
	sponsor_uri: string;
	sponsor_party: string;
	sponsor_state: string;
	introduced_date: string;
	title: string;
	congressdotgov_url: string;
	latest_major_action_date: string;
	latest_major_action: string;
}

interface ProPublicaBillSubjects {
	name: string;
	url_name: string;
}
