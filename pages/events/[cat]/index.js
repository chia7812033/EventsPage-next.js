import Image from 'next/image'

const EventsPerCityPage = (props) => {
  const events = props.data
  const eventsElements = events.map(item => {
    return (
      <a key={item.id} href={`${item.city}/${item.id}`}>
        <h2>{item.title}</h2>
        <Image width={400} height={300} src={item.image} alt={item.id} />
        <p>{item.description}</p>
      </a>
    )
  })
  return (
    <div>
      <h1>Events page</h1>

      {eventsElements}
    </div>

  )
}

export default EventsPerCityPage;

export async function getStaticPaths() {
  const { events_categories } = await import('/data/data.json')
  const allPaths = events_categories.map(item => {
    return {
      params: {
        cat: item.id.toString(),
      }
    }
  })

  return {
    paths: allPaths,
    fallback: false
  }
}

export async function getStaticProps(context) {
  const { allEvents } = await import('/data/data.json')
  const cityEvents = allEvents.filter(item => {
    return item.city === context.params.cat
  })

  return {
    props: {
      data: cityEvents
    }
  }
}
