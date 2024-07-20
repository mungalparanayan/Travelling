import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from 'swiper/modules';
import '../styles/index.css';
import '../styles/shared.css';
import { Link } from 'react-router-dom';

const Index = () => {

    useEffect(() => {
        const videoBtns = document.querySelectorAll('.vid-btn');

        videoBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.controls .active').classList.remove('active');
            btn.classList.add('active');
            const src = btn.getAttribute('data-src');
            document.querySelector('#video-slider').src = src;
        });
        });

        // Clean up the event listeners when the component unmounts
        return () => {
        videoBtns.forEach(btn => {
            btn.removeEventListener('click', () => {
            document.querySelector('.controls .active').classList.remove('active');
            btn.classList.add('active');
            const src = btn.getAttribute('data-src');
            document.querySelector('#video-slider').src = src;
            });
        });
        };
    }, []);

  return (
    <div>
      <section className="home" id="home">
        <div className="content">
          <h3>adventure is worthwhile</h3>
          <p>discover new places with us, adventure awaits</p>
          <a href="#" className="btn"> discover more</a>
        </div>

        <div className="controls">
          <span className="vid-btn active" data-src="videos/video1.mp4"></span>
          <span className="vid-btn" data-src="videos/video2.mp4"></span>
          <span className="vid-btn" data-src="videos/video3.mp4"></span>
          <span className="vid-btn" data-src="videos/video4.mp4"></span>
          <span className="vid-btn" data-src="videos/video5.mp4"></span>
        </div>

        <div className="video-container">
          <video src="videos/video1.mp4" id="video-slider" loop autoPlay muted></video>
        </div>
      </section>

      <section className="packages" id="packages">
        <h1 className="heading">
            <span>p</span>
            <span>a</span>
            <span>c</span>
            <span>k</span>
            <span>a</span>
            <span>g</span>
            <span>e</span>
            <span>s</span>
        </h1>
        <div className="box-container">
            <div className="box">
                <img src="images/mumbai.jpg" alt="" />
                <div className="content">
                    <h3><i className="fas fa-map-marker-alt"></i>mumbai</h3>
                    <p>Mumbai, the bustling heart of India, is a city of contrasts where the spirit of Bollywood meets the bustling rhythm of everyday life.</p>
                    <div className="stars">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="far fa-star"></i>
                    </div>
                    <div className="price">$90.00 <span>$120.00</span> </div>
                    <a href="#" className="btn">book now</a>
                </div>
            </div>
            <div className="box">
                <img src="images/sydney.jpg" alt="" />
                <div className="content">
                    <h3><i className="fas fa-map-marker-alt"></i>sydney</h3>
                    <p>Sydney, known for its stunning harbor and iconic Opera House, offers a perfect blend of natural beauty and vibrant city life.</p>
                    <div className="stars">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="far fa-star"></i>
                    </div>
                    <div className="price">$90.00 <span>$120.00</span> </div>
                    <a href="#" className="btn">book now</a>
                </div>
            </div>
            <div className="box">
                <img src="images/hawaii.jpg" alt="" />
                <div className="content">
                    <h3><i className="fas fa-map-marker-alt"></i>hawaii</h3>
                    <p>Hawaii, a tropical paradise in the Pacific, is famed for its breathtaking beaches, lush landscapes, and rich cultural heritage.</p>
                    <div className="stars">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="far fa-star"></i>
                    </div>
                    <div className="price">$90.00 <span>$120.00</span> </div>
                    <a href="#" className="btn">book now</a>
                </div>
            </div>
            <div className="box">
                <img src="images/paris.jpg" alt="" />
                <div className="content">
                    <h3><i className="fas fa-map-marker-alt"></i>paris</h3>
                    <p>Paris, the city of lights, enchants visitors with its timeless elegance, world-class art, and romantic ambiance.</p>
                    <div className="stars">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="far fa-star"></i>
                    </div>
                    <div className="price">$90.00 <span>$120.00</span> </div>
                    <a href="#" className="btn">book now</a>
                </div>
            </div>
            <div className="box">
                <img src="images/tokyo.jpg" alt="" />
                <div className="content">
                    <h3><i className="fas fa-map-marker-alt"></i>tokyo</h3>
                    <p>Tokyo, a futuristic metropolis, dazzles with its cutting-edge technology, bustling streets, and deep-rooted traditions.</p>
                    <div className="stars">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="far fa-star"></i>
                    </div>
                    <div className="price">$90.00 <span>$120.00</span> </div>
                    <a href="#" className="btn">book now</a>
                </div>
            </div>
            <div className="box">
                <img src="images/egypt.jpeg" alt="" />
                <div className="content">
                    <h3><i className="fas fa-map-marker-alt"></i>egypt</h3>
                    <p>Egypt, the land of ancient pharaohs, captivates with its majestic pyramids, vast deserts, and the timeless allure of the Nile.</p>
                    <div className="stars">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="far fa-star"></i>
                    </div>
                    <div className="price">$90.00 <span>$120.00</span> </div>
                    <a href="#" className="btn">book now</a>
                </div>
            </div>
        </div>
        </section>

        <section className="services" id="services">
            <h1 className="heading">
                <span>s</span>
                <span>e</span>
                <span>r</span>
                <span>v</span>
                <span>i</span>
                <span>c</span>
                <span>e</span>
                <span>s</span>
            </h1>

            <div className="box-container">
                <div className="box">
                    <i className="fas fa-hotel"></i>
                    <h3>affordable hotels</h3>
                    <p>Discover comfort and quality accommodations without breaking the bank.</p>
                </div>
            
                <div className="box">
                    <i className="fas fa-utensils"></i>
                    <h3>food and drinks</h3>
                    <p>Indulge in a variety of delicious cuisines and beverages from around the world.</p>
                </div>
            
                <div className="box">
                    <i className="fas fa-bullhorn"></i>
                    <h3>safety guide</h3>
                    <p>Equip yourself with essential tips for safe and secure travel experiences.</p>
                </div>
            
                <div className="box">
                    <i className="fas fa-globe-asia"></i>
                    <h3>around the world</h3>
                    <p>Journey through diverse destinations and immerse yourself in global cultures.</p>
                </div>
            
                <div className="box">
                    <i className="fas fa-plane"></i>
                    <h3>fastest travel</h3>
                    <p> Experience quick and efficient travel to your favorite destinations.</p>
                </div>
            
                <div className="box">
                    <i className="fas fa-hiking"></i>
                    <h3>adventures</h3>
                    <p>Dive into exciting adventures and make unforgettable memories.</p>
                </div>
            </div>
        </section>

        <section className="gallery" id="gallery">
            <h1 className="heading">
                <span>g</span>
                <span>a</span>
                <span>l</span>
                <span>l</span>
                <span>e</span>
                <span>r</span>
                <span>y</span>
            </h1>

            <div className="box-container">
                <div className="box">
                    <img src="images/p1.jpeg" alt="" />
                    <div className="content">
                        <h3>amazing places</h3>
                        <p>Travel is the only thing you buy that makes you richer.</p>
                        <a href="#" className="btn">see more</a>
                    </div>
                </div>
                <div className="box">
                    <img src="images/p2.jpeg" alt="" />
                    <div className="content">
                        <h3>amazing places</h3>
                        <p>The world is a book; those who do not travel read only one page.</p>
                        <a href="#" className="btn">see more</a>
                    </div>
                </div>
                <div className="box">
                    <img src="images/p3.jpeg" alt="" />
                    <div className="content">
                        <h3>amazing places</h3>
                        <p>Travel far, learn much, experience everything, and cherish every moment.</p>
                        <a href="#" className="btn">see more</a>
                    </div>
                </div>
                <div className="box">
                    <img src="images/p4.jpeg" alt="" />
                    <div className="content">
                        <h3>amazing places</h3>
                        <p>To travel is to live and truly embrace the world.</p>
                        <a href="#" className="btn">see more</a>
                    </div>
                </div>
                <div className="box">
                    <img src="images/p5.jpeg" alt="" />
                    <div className="content">
                        <h3>amazing places</h3>
                        <p>Travel broadens the mind and enriches the soul with unforgettable experiences.</p>
                        <a href="#" className="btn">see more</a>
                    </div>
                </div>
                <div className="box">
                    <img src="images/p6.jpeg" alt="" />
                    <div className="content">
                        <h3>amazing places</h3>
                        <p>Take only memories, leave only footprints on your journeys.</p>
                        <a href="#" className="btn">see more</a>
                    </div>
                </div>
                <div className="box">
                    <img src="images/p7.jpeg" alt="" />
                    <div className="content">
                        <h3>amazing places</h3>
                        <p>The journey itself is just as important as the destination.</p>
                        <a href="#" className="btn">see more</a>
                    </div>
                </div>
                <div className="box">
                    <img src="images/p8.jpeg" alt="" />
                    <div className="content">
                        <h3>amazing places</h3>
                        <p>Adventure awaits those who are brave enough to seek it.</p>
                        <a href="#" className="btn">see more</a>
                    </div>
                </div>
                <div className="box">
                    <img src="images/p9.jpeg" alt="" />
                    <div className="content">
                        <h3>amazing places</h3>
                        <p>Travel teaches you more than school ever could.</p>
                        <a href="#" className="btn">see more</a>
                    </div>
                </div>
            </div>
        </section>

        <section className="review" id="review">
            <h1 className="heading">
                <span>r</span>
                <span>e</span>
                <span>v</span>
                <span>i</span>
                <span>e</span>
                <span>w</span>
            </h1>

            <Swiper
                spaceBetween={20}
                loop={true}
                autoplay={{ 
                    delay: 2500, 
                    disableOnInteraction: false 
                }}
                breakpoints={{
                  640: { slidesPerView: 1 },
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 } 
                }}
                modules = {[Autoplay]}
                className="mySwiper"    
            >
                <SwiperSlide>
                <div className="swiper-slide">
                        <div className="box">
                            <img src="images/r1.jpeg" alt="" />
                            <h3>Veyla Dynar</h3>
                            <p>This website made my vacation planning so much easier! I loved the detailed destination guides and the ability to customize my itinerary.</p>
                            <div className="stars">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="swiper-slide">
                        <div className="box">
                            <img src="images/r5.jpeg" alt="" />
                            <h3>john deo</h3>
                            <p> The site is incredibly user-friendly, and I found the best deals on flights and hotels. </p>
                            <div className="stars">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="far fa-star"></i>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="swiper-slide">
                        <div className="box">
                            <img src="images/r3.jpeg" alt="" />
                            <h3>Brinnax Ulthar</h3>
                            <p>The customer service team was also very responsive and helped me with a few last-minute changes. Highly recommend!</p>
                            <div className="stars">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="swiper-slide">
                        <div className="box">
                            <img src="images/r4.png" alt="" />
                            <h3>Zolthar Korrim</h3>
                            <p>I've tried several travel websites in the past, but this one stands out for its excellent deals and comprehensive travel packages.</p>
                            <div className="stars">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="swiper-slide">
                        <div className="box">
                            <img src="images/r2.jpeg" alt="" />
                            <h3>Melsira Qyoth</h3>
                            <p>The booking process was seamless, and I appreciated the extra tips and recommendations for local attractions. It truly made my trip unforgettable!</p>
                            <div className="stars">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="far fa-star"></i>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </section>

        <section>
            <h1 className="heading">
                <span>h</span>
                <span>i</span>
                <span>g</span>
                <span>h</span>
                <span>l</span>
                <span>i</span>
                <span>g</span>
                <span>h</span>
                <span>t</span>
                <span>s</span>
            </h1>
            <div className="highlights">
                <ul>
                    <li>
                        <img src="images/miami.jpg" alt="Picture of Miami" />
                        <p>Miami <strong>USA</strong> </p>
                    </li>
                    <li>
                        <img src="images/munich.jpg" alt="Picture of Munich" />
                        <p>Munich <strong>GERMANY</strong> </p>
                    </li>
                    <li>
                        <img src="images/barcelona.jpg" alt="Picture of Barcelona" />
                        <p>Barcelona <strong>SPAIN</strong> </p>
                    </li>
                </ul>
            </div>
        </section>
    </div>
  );
}

export default Index;
