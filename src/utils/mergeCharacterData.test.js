import { describe, expect, it } from 'vitest';
import {
  mergeCharacterListData,
  mergeAllCharactersList,
  buildFullCharacterList,
  mergeCharacterDetailData,
} from './mergeCharacterData';

const gon = { slug: 'gon-freecss', nombre: 'Gon Freecss', malId: 30, categoria: 'Protagonista' };
const killua = { slug: 'killua-zoldyck', nombre: 'Killua Zoldyck', malId: 27, categoria: 'Protagonista' };

function apiEntry({ mal_id, name = 'Freecss, Gon', role = 'Main', favorites = 100 }) {
  return {
    character: {
      mal_id,
      name,
      images: { webp: { image_url: `https://cdn.example/${mal_id}.webp` } },
    },
    role,
    favorites,
  };
}

describe('mergeCharacterListData', () => {
  it('merges image/role/favorites when the character is found in the API list', () => {
    const result = mergeCharacterListData(gon, [apiEntry({ mal_id: 30 })]);
    expect(result.apiEncontrado).toBe(true);
    expect(result.imagen).toBe('https://cdn.example/30.webp');
    expect(result.role).toBe('Main');
    expect(result.favoritos).toBe(100);
    expect(result.nombre).toBe('Gon Freecss'); // curated fields preserved
  });

  it('falls back to nulls gracefully when the API list is empty or missing the character', () => {
    const result = mergeCharacterListData(gon, []);
    expect(result.apiEncontrado).toBe(false);
    expect(result.imagen).toBeNull();
    expect(result.role).toBeNull();
    expect(result.favoritos).toBeNull();
  });
});

describe('mergeAllCharactersList', () => {
  it('merges every curated character against the API list', () => {
    const results = mergeAllCharactersList(
      [gon, killua],
      [apiEntry({ mal_id: 30 }), apiEntry({ mal_id: 27, name: 'Zoldyck, Killua' })]
    );
    expect(results).toHaveLength(2);
    expect(results.every((r) => r.apiEncontrado)).toBe(true);
  });
});

describe('buildFullCharacterList', () => {
  it('uses curated data for known characters and bare API data for the rest', () => {
    const apiList = [
      apiEntry({ mal_id: 30 }),
      apiEntry({ mal_id: 999, name: 'Abengane', role: 'Supporting', favorites: 5 }),
    ];

    const result = buildFullCharacterList([gon], apiList);

    expect(result).toHaveLength(2);
    const curatedEntry = result.find((c) => c.malId === 30);
    expect(curatedEntry.slug).toBe('gon-freecss');
    expect(curatedEntry.nombre).toBe('Gon Freecss');

    const uncuratedEntry = result.find((c) => c.malId === 999);
    expect(uncuratedEntry.slug).toBeNull();
    expect(uncuratedEntry.nombre).toBe('Abengane');
    expect(uncuratedEntry.role).toBe('Supporting');
  });

  it('flips "Surname, Given" Jikan names to "Given Surname" for uncurated characters', () => {
    const apiList = [apiEntry({ mal_id: 999, name: 'Zoldyck, Zeno', role: 'Supporting' })];
    const result = buildFullCharacterList([], apiList);
    expect(result[0].nombre).toBe('Zeno Zoldyck');
  });

  it('leaves single-word Jikan names untouched', () => {
    const apiList = [apiEntry({ mal_id: 999, name: 'Kurapika', role: 'Main' })];
    const result = buildFullCharacterList([], apiList);
    expect(result[0].nombre).toBe('Kurapika');
  });
});

describe('mergeCharacterDetailData', () => {
  it('merges parsed about fields, voices, and gallery from full detail + pictures', () => {
    const detail = {
      images: { jpg: { image_url: 'https://cdn.example/30.jpg' } },
      name_kanji: 'ゴン=フリークス',
      about: 'Age: 12\nOccupation: Hunter\nNen type: Enhancement',
      voices: [
        { language: 'Japanese', person: { name: 'Takeuchi, Junko' } },
        { language: 'English', person: { name: 'Holt, Elinor' } },
      ],
    };
    const pictures = [{ jpg: { image_url: 'https://cdn.example/pic1.jpg' } }];

    const result = mergeCharacterDetailData(gon, detail, pictures);

    expect(result.apiEncontrado).toBe(true);
    expect(result.edad).toBe('12');
    expect(result.ocupacion).toBe('Hunter');
    expect(result.tipoNenApi).toBe('Enhancement');
    expect(result.voces.map((v) => v.language)).toEqual(['Japanese', 'English']);
    expect(result.galeria).toEqual(['https://cdn.example/pic1.jpg']);
  });

  it('degrades gracefully when detail and pictures are both null (API unavailable)', () => {
    const result = mergeCharacterDetailData(gon, null, null);
    expect(result.apiEncontrado).toBe(false);
    expect(result.imagen).toBeNull();
    expect(result.voces).toEqual([]);
    expect(result.galeria).toEqual([]);
    expect(result.nombre).toBe('Gon Freecss');
  });
});
