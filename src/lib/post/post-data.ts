import { DateTime } from 'luxon';
import { browser } from '$app/environment'

export interface PostData {
	url: string;
	urlRel: string;
	title: string;
	description: string;
	date: string;
	featured: boolean;
};

export function getLocaleDate(date: string): string {
	return DateTime.fromISO(date).toLocaleString(DateTime.DATE_FULL, { locale: browser ? undefined : "en-GB" });
}