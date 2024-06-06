'use server';

import { CoverImage } from "@kala-pavura/models";

export async function getPhotos(query: string) {
  const SOURCE_URL = "https://api.unsplash.com/"
  const res = await fetch(`${SOURCE_URL}/search/photos?query=${query}&client_id=${process.env.UNSPLASH_ACCESS_KEY}&per_page=12`);
  const data = await res.json();
  const results = data["results"];
  if(!results) return [];

  const images: CoverImage[] = results.map((result: any) => {
    return {
      id: result["id"],
      alt: result["alt_description"],
      imageAuthor: result["user"]["name"],
      thumbnail: result["urls"]["thumb"],
      small: result["urls"]["small"],
      regular: result["urls"]["regular"]
    }
  });
  return images;
}