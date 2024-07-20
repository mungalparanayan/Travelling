import React from 'react'
import '../styles/world.css'

const world = () => {
    return (
        <div>
            <main className="mainn">
                <img src="images/see_world.jpg" alt="" />
                <section className="world">
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
                </section>
                <section>
                    <div className="continent">
                        <img src="images/africa.jpg" alt="" />
                        <div className="box1">
                            <h1>Africa</h1>
                            <p>Richly diverse and achingly wild, with an abundance of wildlife, cultural hotspots, and beauty: prepare to fall under Africa's spell.</p>
                        </div>
                    </div>
                    <div className="continent1">
                        <div className="box2">
                            <h1>Asia</h1>
                            <p>Discover ancient gilded temples, the lush greens and blues of tropical paradise, snow-capped mountains, the peace of monks in prayer, and the honking chaos of neon cities.</p>
                        </div>
                        <img src="images/asia.jpg" alt="" />
                    </div>
                    <div className="continent">
                        <img src="images/australia_world.jpg" alt="" />
                        <div className="box3">
                            <h1>Australia</h1>
                            <p>Rugged and wild, from the scorching red deserts of the Outback to the picturesque turquoise coastlines, Australia is a land of extremes and stunning beauty.</p>
                        </div>
                    </div>
                    <div className="continent1">
                        <div className="box4">
                            <h1>Europe</h1>
                            <p>Cobblestones, cafes, culture - the magic of Europe really needs no introduction. What could be more iconic to a traveller than the sparkling Eiffel Tower, the romantic canals of Venice, or the snow-capped ski heaven of the Alps?!</p>
                        </div>
                        <img src="images/europe.jpg" alt="" />
                    </div>
                </section>
            </main>
        </div>
    )
}

export default world