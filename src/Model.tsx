import { Identifier } from "typescript";

export interface Suggestions {
  artistMatch: string[];
  songMatch: string[];
}

export interface Artist {
  artistName?: string;
  artistId?: number;
  artwork?: string;
  artworkUrl100?: string;
  artistViewUrl?: string;
  country?: string;
  primaryGenreName?: string;
  trackCount?: number;
  artistLinkUrl?: string;
  previewUrl?: string;
  amgArtistId?: number;
}

export interface Song {
  artistName: string;
  trackName: string;
  artistId: number;
  trackId: number;
  artwork: string;
  artistViewUrl: string;
  trackViewUrl?: string;
  collectionName: string;
  country: string;
  trackTimeMillis: number;
  releaseDate: string;
  collectionPrice: number;
  primaryGenreName: string;
  artworkUrl100: string;
  artworkUrl60: string;
  collectionCensoredName: string;
  previewUrl: string;
  collectionViewUrl: string;
}
export interface LocationStateCustom {
  artistListRes: Artist;
  uncompleteArtistInfo: Artist;
  artistInfo: Artist;
  songInfo: Song;
  url: string;
  artistName: string;
  trackName: string;
  isLoading: boolean;
  finishLoading: boolean;
}
export interface LocationParams {
  pathname: string;
  state: LocationStateCustom;
  search: string;
  hash: string;
  key: string;
}
export interface Album {
  amgArtistId: number;
  artistId: number;
  artistName: string;
  artistViewUrl: string;
  artworkUrl60: string;
  artworkUrl100: string;
  collectionCensoredName: string;
  collectionExplicitness: string;
  collectionId: string;
  collectionName: string;
  collectionPrice: number;
  collectionType: string;
  collectionViewUrl: string;
  copyright: string;
  country: string;
  currency: string;
  primaryGenreName: string;
  releaseDate: string;
  trackCount: number;
  wrapperType: string;
}
