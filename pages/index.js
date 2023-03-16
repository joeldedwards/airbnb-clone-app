import Head from 'next/head'
import Banner from '../components/Banner'
import Footer from '../components/Footer';
import Header from '../components/Header'
import LargeCard from '../components/LargeCard';
import MediumCard from '../components/MediumCard';
import SmallCard from '../components/SmallCard';

export default function Home({ exploreData, cardsData }) {
  return (
    <div className=''>
      <Head>
        <title>Airbnb 2.0</title>
      </Head>
      <Header />
      <Banner />
      <main
        className='max-w-7xl mx-auto px-8 sm:px-16'>
        <section
          className='pt-6'>
          <h2 
            className='text-4xl font-semibold pb-5'>Explore Nearby</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {
            exploreData.map((item) => (
              <SmallCard 
                key={item.id}
                img={item.img}
                distance={item.distance}
                location={item.location} 
              />
            ))
          }
          </div>
        </section>
        <section
          className='pt-6'>
          <h2 
            className='text-4xl font-semibold pb-5'>Live Anywhere</h2>
            <div 
              className='flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3'>
            {
              cardsData.map((place) => (
                <MediumCard
                  key={place.id}
                  img={place.img}
                  title={place.title} />
              ))
            }
            </div>
        </section>

        <LargeCard
          img='http://cdn.trinicreations.com/builds/react/airbnb-clone-app/images/cj4.webp'
          title='The Greatest Outdoors'
          description='Wishlists Curated By Airbnb.'
          buttonText='Get Inspired' />
      </main>

      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  const exploreData = await fetch("http://cdn.trinicreations.com/builds/react/airbnb-clone-app/utils/_data.json").then((res) => res.json());

  const cardsData = await fetch("http://cdn.trinicreations.com/builds/react/airbnb-clone-app/utils/_cards.json").then((res) => res.json());

  return {
    props: {
      exploreData,
      cardsData
    }
  }
}

