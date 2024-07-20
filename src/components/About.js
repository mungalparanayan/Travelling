import React from 'react'
import '../styles/about.css'
import Places from './Places'   

const about = () => {
  return (
    <>
    <div>
        <main className="ma">
            <div>
                <img className="im" src="images/about_back.jpg" alt="Images of mountain" />
            </div>
            <div className="world">
              <div className="drawing">
                <p className="pa1">It's a big world out there - we're here to help you explore it</p>
                <p className="pa2">slowly and sustainably</p>
                <div className="ps">
                    <ul>
                        <li>We began our life on the road in 2015, with a backpacking trip through Asia, Africa, and Europe before settling in London first, and then Budapest (where we still live!).</li>
                        <li>Since our humble beginnings a lot has changed, yet our inspirations remain the same: watching a sunset over foreign lands, exploring chaotic and colourful local markets, finding the ultimate street food, or learning all about unique cultures.</li>
                        <li>Below, you'll find travel stories, destinations guides, photography journals, and sustainable travel  tips from each of the destinations we've been fortunate to visit over the last 6 years.</li>
                        <li>Either search by continent, or keep scrolling to each individual destination below.</li>
                    </ul>
                </div>
              </div>
            </div>
            <div className='conti'>
                <div className="continent">
                    <img src="images/africa.jpg" alt="" />
                    <div className="boxx">
                        <h1>Africa</h1>
                        <p>Richly diverse and achingly wild, with an abundance of wildlife, cultural hotspots, and beauty: prepare to fall under Africa's spell.</p>
                    </div>
                </div>
                <div className="continent">
                    <img src="images/asia.jpg" alt="" />
                    <div className="boxx">
                        <h1>Asia</h1>
                        <p>Discover ancient gilded temples, the lush greens and blues of tropical paradise, snow-capped mountains, the peace of monks in prayer, and the honking chaos of neon cities.</p>
                    </div>
                </div>
                <div className="continent">
                    <img src="images/australia_world.jpg" alt="" />
                    <div className="boxx">
                        <h1>Australia</h1>
                        <p>Rugged and wild, from the scorching red deserts of the Outback to the picturesque turquoise coastlines, Australia is a land of extremes and stunning beauty.</p>
                    </div>
                </div>
                <div className="continent">
                    <img src="images/europe.jpg" alt="" />
                    <div className="boxx">
                        <h1>Europe</h1>
                        <p>Cobblestones, cafes, culture - the magic of Europe really needs no introduction. What could be more iconic to a traveller than the sparkling Eiffel Tower, the romantic canals of Venice, or the snow-capped ski heaven of the Alps?!</p>
                    </div>
                </div>
            </div>
            <div className='pla'>
              <h1 style={{paddingBottom: 0}} className="heading">
                  <span>b</span>
                  <span>e</span>
                  <span>a</span>
                  <span>u</span>
                  <span>t</span>
                  <span>i</span>
                  <span>f</span>
                  <span>u</span>
                  <span>l</span>
              </h1>
              <h1 className='heading'>
                  <span>p</span>
                  <span>l</span>
                  <span>a</span>
                  <span>c</span>
                  <span>e</span>
                  <span>s</span>
              </h1>
            </div>
            <div className='city-list'>
                <Places city="new-york-city" cityName="New York" msg="New York is the most populous city in the United States. New York City is also the most densely populated major city in the United States." />
                <Places city="london" cityName="London" msg="London is the capital and largest city of England and the United Kingdom, with a population of just under 9 million." />
                <Places city="paris" cityName="Paris" msg="Paris is the capital and most populous city of France, in the 19th century it became known as 'the City of Light'. " />
                <Places city="sydney" cityName="Sydney" msg="Sydney is the capital city of the state of New South Wales, and the most populous city in both Australia and Oceania." />
                <Places city="tokyo" cityName="Tokyo" msg="Tokyo is the capital and largest city of Japan. Its metropolitan area 'Edo' is the most populous in the world, is Located at the head of Tokyo Bay." />
                <Places city="bali" cityName="Bali" msg="Bali is a province of Indonesia and the westernmost of the Lesser Sunda Islands. East of Java and west of Lombok, the province includes the island of Bali." />
                <Places city="barcelona" cityName="Barcelona" msg="Barcelona, on Spain's northeastern coast, is the capital of Catalonia. Known for its art, architecture, and vibrant culture." />
                <Places city="hawaii" cityName="Hawaii" msg="Hawaii is a state in the Western United States, located in the Pacific Ocean about 2,000 miles from the U.S. mainland." />
                <Places city="miami" cityName="Miami" msg="Miami known as 'The Magic City', and 'Gateway to the Americas', is a coastal metropolis and the county seat of Miami-Dade County in South Florida, United States." />
                <Places city="munich" cityName="Munich" msg="Munich is the capital and most populous city of the German state of Bavaria. it is the third-largest city in Germany, after Berlin and Hamburg." />
            </div>
        </main>
    </div>
    </>
  )
}

export default about