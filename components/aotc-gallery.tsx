'use client'

import { useMemo, useState } from 'react'

type Tier = 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY'
type Card = {
  code: string
  name: string
  series: string
  movie: string
  tier: Tier
  intro: string
  image: string
  source: string
  tone: string
}

// These are real characters. Artwork is loaded from the two PNG galleries requested
// by the project brief; check each site's license before publishing commercially.
const characters: Omit<Card, 'code'>[] = [
  {
    name: 'Goku',
    series: 'Dragon Ball Z',
    movie: 'Dragon Ball Super: Broly',
    tier: 'LEGENDARY',
    intro: 'A Saiyan warrior whose hunger for a stronger challenge never ends.',
    image: 'https://pngdownload.io/png-image/gogeta-blue-hair-super-saiyan-dragon-ball-fusion-character-anime-fighter-transparent/',
    source: 'https://pngdownload.io/image_tag/anime/',
    tone: 'gold',
  },
  {
    name: 'Naruto Uzumaki',
    series: 'Naruto',
    movie: 'The Last: Naruto the Movie',
    tier: 'EPIC',
    intro: 'The spirited ninja who turned loneliness into a promise to protect everyone.',
    image: 'https://pngdownload.io/png-image/naruto-anime-and-manga-character-from-konoha-transparent-png-image/',
    source: 'https://pngdownload.io/image_tag/anime/',
    tone: 'coral',
  },
  {
    name: 'Monkey D. Luffy',
    series: 'One Piece',
    movie: 'One Piece Film: Red',
    tier: 'LEGENDARY',
    intro: 'The rubber-powered captain sailing toward the greatest treasure in the world.',
    image: 'https://pngdownload.io/png-image/monkey-d-luffy-gear-5-laughing-one-piece-joyboy-anime-character/',
    source: 'https://pngdownload.io/image_tag/anime/',
    tone: 'cyan',
  },
  {
    name: 'Sailor Moon',
    series: 'Sailor Moon',
    movie: 'Sailor Moon Eternal',
    tier: 'RARE',
    intro: 'Usagi Tsukino becomes a cosmic guardian powered by love, friendship, and courage.',
    image: 'https://www.pngwing.com/en/free-png-yptpq',
    source: 'https://pngdownload.io/image_tag/anime/',
    tone: 'violet',
  },
  {
    name: 'Satoru Gojo',
    series: 'Jujutsu Kaisen',
    movie: 'Jujutsu Kaisen 0',
    tier: 'EPIC',
    intro: 'The limitless sorcerer who stands between ordinary people and cursed spirits.',
    image: 'https://pngdownload.io/png-image/satoru-gojo-jujutsu-kaisen-strongest-sorcerer-png-image/',
    source: 'https://www.pngarts.com/explore/tag/anime-character',
    tone: 'cyan',
  },
]

const cards: Card[] = characters.map((character, index) => ({
  ...character,
  code: `A${String(index + 1).padStart(2, '0')}${character.name.replace(/[^A-Z]/gi, '').slice(0, 2).toUpperCase()}`,
}))
const tiers: Tier[] = ['COMMON', 'RARE', 'EPIC', 'LEGENDARY']

export function AotcGallery() {
  const [selected, setSelected] = useState<Card | null>(null)
  const [filter, setFilter] = useState<Tier | 'ALL'>('ALL')
  const filteredCards = useMemo(() => filter === 'ALL' ? cards : cards.filter((card) => card.tier === filter), [filter])

  return <main className="card-page">
    <header className="card-header">
      <div>
        <span className="eyebrow">AOTC / REAL CHARACTER ARCHIVE</span>
        <h1>ANIME CHARACTER CARDS</h1>
        <p>Collectible cards featuring real anime characters and artwork from the requested PNG galleries.</p>
      </div>
      <strong>{cards.length} CARDS</strong>
    </header>
    <nav className="tier-filter" aria-label="Filter cards by tier">
      {(['ALL', ...tiers] as const).map((tier) => <button key={tier} className={filter === tier ? 'active' : ''} onClick={() => setFilter(tier)}>{tier}</button>)}
    </nav>
    <section className="card-grid" aria-label="Anime character card collection">
      {filteredCards.map((card) => <button className={`visual-card tier-${card.tier.toLowerCase()}`} key={card.code} onClick={() => setSelected(card)} aria-label={`${card.name}, ${card.series}, view details`}>
        <div className={`card-poster ${card.tone}`}>
          <span className="scanline" />
          <img src={card.image} alt={`${card.name} character artwork`} loading="lazy" />
          <div className="card-top"><span>AOTC</span><b>{card.tier}</b></div>
          <div className="card-copy"><small>{card.series}</small><strong>{card.name}</strong><p>{card.intro}</p><i>{card.code}</i></div>
        </div>
      </button>)}
    </section>
    {selected && <div className="detail-backdrop" onClick={() => setSelected(null)}>
      <article className={`card-detail ${selected.tone}`} role="dialog" aria-modal="true" aria-labelledby="detail-title" onClick={(event) => event.stopPropagation()}>
        <button className="detail-close" onClick={() => setSelected(null)} aria-label="Close card details">Close</button>
        <img src={selected.image} alt={`${selected.name} character artwork`} />
        <span className="eyebrow">{selected.code} / {selected.tier}</span>
        <h2 id="detail-title">{selected.name}</h2>
        <p><b>{selected.series}</b> · {selected.movie}</p>
        <p>{selected.intro}</p>
        <a href={selected.source} target="_blank" rel="noreferrer">View image source</a>
      </article>
    </div>}
  </main>
}
