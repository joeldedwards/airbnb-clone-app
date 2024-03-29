import { format } from 'date-fns';
import { useRouter } from 'next/router'
import Footer from '../components/Footer'
import Header from '../components/Header'
import InfoCard from '../components/InfoCard';
import MapBox from '../components/Map';

function Search({ searchResults }) {

    const router = useRouter();
    const { location, startDate, endDate, numOfGuests } = router.query;
    const formattedStartDate = format(new Date(startDate), 'dd MMMM yy');
    const formattedEndDate = format(new Date(endDate), 'dd MMMM yy');
    const range = `${formattedStartDate} - ${formattedEndDate}`;
    
    return (
        <div className='h-screen overflow-hidden'>
            <Header placeholder={`${location} | ${range} | ${numOfGuests} guests`} />
            <main className='flex h-screen'>
                <section className='flex-grow pt-14 px-6 overflow-y-auto'>
                    <p className='text-xs'>
                        300+ Stays - {range} for {numOfGuests} Guests
                    </p>
                    <h1 className='text-3xl font-semibold mt-2 mb-6'>
                        Stays in {location}
                    </h1>

                    <div className='hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap'>
                        <p className='button'>Cancellation Flexibility</p>
                        <p className='button'>Type of Place</p>
                        <p className='button'>Price</p>
                        <p className='button'>Rooms and Beds</p>
                        <p className='button'>More Filters</p>
                    </div>
                    <div className="flex flex-col">
                    {
                        searchResults.map(({ id, img, location, title, description, star, price, total, long, lat }) => (
                            <InfoCard
                                key={id}
                                img={img}
                                location={location}
                                title={title}
                                description={description}
                                star={star}
                                price={price}
                                total={total}
                                long={long}
                                lat={lat} />
                        ))
                    }
                    </div>
                </section>

                <section className='hidden h-screen xl:inline-flex xl:min-w-[600px]'>
                    <MapBox searchResults={searchResults} />
                </section>
            </main>
            <Footer />
        </div>
    )
}

export default Search

export async function getServerSideProps(context) {
    const searchResults = await fetch('http://cdn.trinicreations.com/builds/react/airbnb-clone-app/utils/_listings.json').then(res => res.json());

    return {
        props: {
            searchResults
        }
    }
}