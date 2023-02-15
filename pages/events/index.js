import Image from 'next/image'
import Link from 'next/link'

const EventsPage = (props) => {
  const data = props.data
  const dataElements = data.map(item => {
    return (
      <Link key={item.id} href={`/events/${item.id}`}>
        <Image height="300" width="300" src={item.image} alt={item.id} />
        <h2>{item.title}</h2>
      </Link>
    )
  })
  return (
    <div>
      <h1>Events page</h1>
      {dataElements}
    </div>

  )
}

export default EventsPage;

export async function getServerSideProps() {
  const { events_categories } = await import('/data/data.json')
  return {
    props: {
      data: events_categories
    }
  }
}
