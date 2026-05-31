import { PrismaClient, EventType, EventTheme, EventStatus, GenderRestriction, UserRole, SubscriptionTier, SubscriptionStatus, Gender } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create sample chapters
  const chapters = await createChapters()
  console.log(`✅ Created ${chapters.length} chapters`)

  // Create sample users with different roles
  const users = await createUsers()
  console.log(`✅ Created ${users.length} users`)

  // Create sample events
  const events = await createEvents(users, chapters)
  console.log(`✅ Created ${events.length} events`)

  // Create some RSVPs
  await createRSVPs(users, events)
  console.log('✅ Created RSVPs')

  // Create some comments
  await createComments(users, events)
  console.log('✅ Created comments')

  // Create some reviews
  await createReviews(users, events)
  console.log('✅ Created reviews')

  console.log('🎉 Database seed completed!')
}

async function createChapters() {
  const chapterData = [
    { name: 'London', city: 'London', country: 'United Kingdom', description: 'The heart of Halal Dining in the UK' },
    { name: 'Birmingham', city: 'Birmingham', country: 'United Kingdom', description: 'Birminghams vibrant halal dining scene' },
    { name: 'Manchester', city: 'Manchester', country: 'United Kingdom', description: 'Manchesters thriving Muslim community' },
    { name: 'Bradford', city: 'Bradford', country: 'United Kingdom', description: 'Home to one of the UKs largest Muslim communities' },
    { name: 'Glasgow', city: 'Glasgow', country: 'United Kingdom', description: 'Scotlands halal dining community' },
  ]

  return await Promise.all(
    chapterData.map(data => 
      prisma.chapter.upsert({
        where: { city_country: { city: data.city, country: data.country } },
        update: {},
        create: data,
      })
    )
  )
}

async function createUsers() {
  const password = await hash('password123', 12)

  const usersData = [
    {
      email: 'admin@halaldinner.club',
      name: 'Admin User',
      role: UserRole.ADMIN,
      subscriptionTier: SubscriptionTier.HOST,
      subscriptionStatus: SubscriptionStatus.ACTIVE,
      city: 'London',
      country: 'United Kingdom',
      age: 35,
      gender: Gender.MALE,
      bio: 'Platform administrator and community builder.',
    },
    {
      email: 'sarah.host@example.com',
      name: 'Sarah Ahmed',
      role: UserRole.HOST,
      subscriptionTier: SubscriptionTier.HOST,
      subscriptionStatus: SubscriptionStatus.ACTIVE,
      city: 'London',
      country: 'United Kingdom',
      age: 28,
      gender: Gender.FEMALE,
      bio: 'Love bringing people together over great food!',
      dinnersHosted: 12,
      isFrequentHost: true,
    },
    {
      email: 'ahmed.host@example.com',
      name: 'Ahmed Hassan',
      role: UserRole.HOST,
      subscriptionTier: SubscriptionTier.HOST,
      subscriptionStatus: SubscriptionStatus.ACTIVE,
      city: 'Birmingham',
      country: 'United Kingdom',
      age: 32,
      gender: Gender.MALE,
      bio: 'Professional chef turned dinner host.',
      dinnersHosted: 8,
      isFrequentHost: true,
    },
    {
      email: 'fatima.host@example.com',
      name: 'Fatima Khan',
      role: UserRole.HOST,
      subscriptionTier: SubscriptionTier.HOST,
      subscriptionStatus: SubscriptionStatus.ACTIVE,
      city: 'Manchester',
      country: 'United Kingdom',
      age: 26,
      gender: Gender.FEMALE,
      bio: 'Organizing singles dinners and networking events.',
      dinnersHosted: 5,
    },
    {
      email: 'omar.member@example.com',
      name: 'Omar Farooq',
      role: UserRole.MEMBER,
      subscriptionTier: SubscriptionTier.MEMBER,
      subscriptionStatus: SubscriptionStatus.ACTIVE,
      city: 'London',
      country: 'United Kingdom',
      age: 29,
      gender: Gender.MALE,
      bio: 'Software engineer looking to meet like-minded Muslims.',
      dinnersAttended: 7,
    },
    {
      email: 'aisha.member@example.com',
      name: 'Aisha Patel',
      role: UserRole.MEMBER,
      subscriptionTier: SubscriptionTier.MEMBER,
      subscriptionStatus: SubscriptionStatus.ACTIVE,
      city: 'London',
      country: 'United Kingdom',
      age: 24,
      gender: Gender.FEMALE,
      bio: 'Medical student who loves social dining.',
      dinnersAttended: 4,
    },
    {
      email: 'yusuf.member@example.com',
      name: 'Yusuf Ibrahim',
      role: UserRole.MEMBER,
      subscriptionTier: SubscriptionTier.MEMBER,
      subscriptionStatus: SubscriptionStatus.ACTIVE,
      city: 'Birmingham',
      country: 'United Kingdom',
      age: 31,
      gender: Gender.MALE,
      bio: 'Entrepreneur and food enthusiast.',
      dinnersAttended: 10,
      isVeteranAttendee: true,
    },
    {
      email: 'maryam.member@example.com',
      name: 'Maryam Ali',
      role: UserRole.MEMBER,
      subscriptionTier: SubscriptionTier.MEMBER,
      subscriptionStatus: SubscriptionStatus.ACTIVE,
      city: 'Manchester',
      country: 'United Kingdom',
      age: 27,
      gender: Gender.FEMALE,
      bio: 'Marketing professional. Love the community vibe.',
      dinnersAttended: 3,
    },
    {
      email: 'guest@example.com',
      name: 'Guest User',
      role: UserRole.GUEST,
      subscriptionTier: SubscriptionTier.FREE,
      subscriptionStatus: SubscriptionStatus.NONE,
      city: 'London',
      country: 'United Kingdom',
      age: 25,
      gender: Gender.MALE,
    },
  ]

  return await Promise.all(
    usersData.map(data => 
      prisma.user.upsert({
        where: { email: data.email },
        update: {},
        create: {
          ...data,
          password,
          emailVerified: new Date(),
        },
      })
    )
  )
}

async function createEvents(users: any[], chapters: any[]) {
  const hosts = users.filter((u: any) => u.role === UserRole.HOST || u.role === UserRole.ADMIN)
  const londonChapter = chapters.find((c: any) => c.city === 'London')
  const birminghamChapter = chapters.find((c: any) => c.city === 'Birmingham')
  const manchesterChapter = chapters.find((c: any) => c.city === 'Manchester')

  const now = new Date()
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000)
  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
  const twoWeeks = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000)
  const nextMonth = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)

  const eventsData = [
    {
      title: 'Eid Ul-Adha Celebration Dinner',
      description: 'Join us for a special Eid celebration dinner. We will be sharing stories, enjoying incredible food, and building connections within our community.',
      shortDescription: 'Celebrate Eid with a special dinner at a fine halal restaurant.',
      hostId: hosts[0].id,
      type: EventType.DINNER,
      theme: EventTheme.EID,
      city: 'London',
      country: 'United Kingdom',
      venueName: 'The Great Chase',
      address: '316 St John Street, Islington, London EC1V 4NT',
      latitude: 51.5308,
      longitude: -0.1022,
      chapterId: londonChapter?.id,
      dateTime: nextWeek,
      capacity: 12,
      price: 0,
      isSinglesEvent: false,
      status: EventStatus.PUBLISHED,
      coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200',
    },
    {
      title: 'Muslim Professionals Networking Dinner',
      description: 'An evening of meaningful connections for Muslim professionals across industries. Whether you are in tech, finance, healthcare, or creative fields, come meet your peers.',
      shortDescription: 'Connect with Muslim professionals over halal dining.',
      hostId: hosts[0].id,
      type: EventType.DINNER,
      theme: EventTheme.NETWORKING,
      city: 'London',
      country: 'United Kingdom',
      venueName: 'Benares Restaurant',
      address: '12a Berkeley Square, Mayfair, London W1J 6BS',
      latitude: 51.5081,
      longitude: -0.1459,
      chapterId: londonChapter?.id,
      dateTime: twoWeeks,
      capacity: 20,
      price: 0,
      isSinglesEvent: false,
      status: EventStatus.PUBLISHED,
      coverImage: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200',
    },
    {
      title: 'Singles Dinner: Ages 25-35',
      description: 'A curated singles dinner for Muslims aged 25-35 looking to meet someone special in a respectful, halal environment.',
      shortDescription: 'Meet other single Muslims aged 25-35.',
      hostId: hosts[0].id,
      type: EventType.DINNER,
      theme: EventTheme.SINGLES,
      city: 'London',
      country: 'United Kingdom',
      venueName: 'The Halal Guys',
      address: '14-15 Irving Street, London WC2H 7AF',
      latitude: 51.5094,
      longitude: -0.1281,
      chapterId: londonChapter?.id,
      dateTime: nextMonth,
      capacity: 12,
      price: 15,
      isSinglesEvent: true,
      minAge: 25,
      maxAge: 35,
      genderRestriction: GenderRestriction.ANY,
      status: EventStatus.PUBLISHED,
      coverImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200',
    },
    {
      title: 'Weekend Family Brunch',
      description: 'Bring the whole family for a relaxed weekend brunch! Kids welcome, high chairs available.',
      shortDescription: 'Family-friendly brunch bringing Muslim families together.',
      hostId: hosts[0].id,
      type: EventType.BRUNCH,
      theme: EventTheme.FAMILY,
      city: 'London',
      country: 'United Kingdom',
      venueName: 'The Breakfast Club',
      address: '33 DArblay Street, Soho, London W1F 8EU',
      latitude: 51.5136,
      longitude: -0.1367,
      chapterId: londonChapter?.id,
      dateTime: new Date(nextWeek.getTime() + 2 * 24 * 60 * 60 * 1000),
      capacity: 25,
      price: 0,
      isSinglesEvent: false,
      status: EventStatus.PUBLISHED,
      coverImage: 'https://images.unsplash.com/photo-1533089862017-5614ec57f241?w=1200',
    },
    {
      title: 'Ramadan Iftar Gathering',
      description: 'Break your fast with the community this Ramadan. We will provide dates, water, and a full iftar meal.',
      shortDescription: 'Community iftar for breaking fast together.',
      hostId: hosts[0].id,
      type: EventType.DINNER,
      theme: EventTheme.RAMADAN,
      city: 'London',
      country: 'United Kingdom',
      venueName: 'Islamic Cultural Centre',
      address: '146 Park Road, London NW8 7RG',
      latitude: 51.5296,
      longitude: -0.1673,
      chapterId: londonChapter?.id,
      dateTime: tomorrow,
      capacity: 50,
      price: 0,
      isSinglesEvent: false,
      status: EventStatus.PUBLISHED,
      coverImage: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=1200',
    },
    {
      title: 'Curry Mile Food Tour',
      description: 'Experience the famous Curry Mile. We will be visiting different restaurants sampling the best halal food.',
      shortDescription: 'A culinary journey across Curry Mile.',
      hostId: hosts[1].id,
      type: EventType.DINNER,
      theme: EventTheme.SOCIAL,
      city: 'Birmingham',
      country: 'United Kingdom',
      venueName: 'Curry Mile Venues',
      address: 'Ladypool Road, Birmingham B12 8JA',
      latitude: 52.4508,
      longitude: -1.8995,
      chapterId: birminghamChapter?.id,
      dateTime: nextWeek,
      capacity: 15,
      price: 35,
      isSinglesEvent: false,
      status: EventStatus.PUBLISHED,
      coverImage: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=1200',
    },
    {
      title: 'Young Muslims Breakfast Club',
      description: 'Start your weekend right with our monthly breakfast club for Muslims aged 18-25.',
      shortDescription: 'Monthly breakfast meetup for young Muslims.',
      hostId: hosts[1].id,
      type: EventType.BREAKFAST,
      theme: EventTheme.SOCIAL,
      city: 'Birmingham',
      country: 'United Kingdom',
      venueName: 'Yorks Cafe',
      address: '29-31 Stephenson Street, Birmingham B2 4BH',
      latitude: 52.4778,
      longitude: -1.8997,
      chapterId: birminghamChapter?.id,
      dateTime: new Date(nextWeek.getTime() + 3 * 24 * 60 * 60 * 1000),
      capacity: 16,
      price: 12,
      isSinglesEvent: false,
      status: EventStatus.PUBLISHED,
      coverImage: 'https://images.unsplash.com/photo-1533089862017-5614ec57f241?w=1200',
    },
    {
      title: 'Sisters Only: High Tea',
      description: 'A relaxing afternoon for sisters only. Enjoy traditional high tea with halal sandwiches, scones, and cakes.',
      shortDescription: 'Women-only high tea event for building sisterhood.',
      hostId: hosts[2].id,
      type: EventType.LUNCH,
      theme: EventTheme.SOCIAL,
      city: 'Manchester',
      country: 'United Kingdom',
      venueName: 'The Midland Hotel',
      address: '16 Peter Street, Manchester M60 2DS',
      latitude: 53.4783,
      longitude: -2.2455,
      chapterId: manchesterChapter?.id,
      dateTime: twoWeeks,
      capacity: 10,
      price: 25,
      isSinglesEvent: false,
      genderRestriction: GenderRestriction.WOMEN,
      status: EventStatus.PUBLISHED,
      coverImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200',
    },
    {
      title: 'Muslim Entrepreneurs Lunch',
      description: 'Join fellow Muslim entrepreneurs for lunch and share experiences, challenges, and opportunities.',
      shortDescription: 'Networking lunch for Muslim entrepreneurs.',
      hostId: hosts[2].id,
      type: EventType.LUNCH,
      theme: EventTheme.PROFESSIONAL,
      city: 'Manchester',
      country: 'United Kingdom',
      venueName: 'Rudys Pizza',
      address: '9 Cotton Street, Ancoats, Manchester M4 5BF',
      latitude: 53.4841,
      longitude: -2.2312,
      chapterId: manchesterChapter?.id,
      dateTime: new Date(twoWeeks.getTime() + 2 * 24 * 60 * 60 * 1000),
      capacity: 14,
      price: 0,
      isSinglesEvent: false,
      status: EventStatus.PUBLISHED,
      coverImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200',
    },
    {
      title: 'Singles Brunch: Ages 30-40',
      description: 'A relaxed brunch for single Muslims aged 30-40. Sometimes it is harder to meet people in this age bracket.',
      shortDescription: 'Relaxed brunch for single Muslims aged 30-40.',
      hostId: hosts[2].id,
      type: EventType.BRUNCH,
      theme: EventTheme.SINGLES,
      city: 'Manchester',
      country: 'United Kingdom',
      venueName: 'Federal Cafe Bar',
      address: '9 Nicholas Croft, Manchester M4 1EY',
      latitude: 53.4845,
      longitude: -2.2361,
      chapterId: manchesterChapter?.id,
      dateTime: nextMonth,
      capacity: 10,
      price: 18,
      isSinglesEvent: true,
      minAge: 30,
      maxAge: 40,
      genderRestriction: GenderRestriction.ANY,
      status: EventStatus.PUBLISHED,
      coverImage: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=1200',
    },
    {
      title: 'Charity Fundraising Dinner',
      description: 'An evening of fine dining for a great cause. All profits go towards building wells in drought-affected regions.',
      shortDescription: 'Fine dining fundraising dinner for clean water projects.',
      hostId: hosts[0].id,
      type: EventType.DINNER,
      theme: EventTheme.CHARITY,
      city: 'London',
      country: 'United Kingdom',
      venueName: 'The Dorchester',
      address: '53 Park Lane, Mayfair, London W1K 1QA',
      latitude: 51.5074,
      longitude: -0.1526,
      chapterId: londonChapter?.id,
      dateTime: nextMonth,
      capacity: 100,
      price: 50,
      isSinglesEvent: false,
      status: EventStatus.PUBLISHED,
      coverImage: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1200',
    },
    {
      title: 'New Muslims Welcome Dinner',
      description: 'A warm welcome for new Muslims and those interested in Islam. This is a safe space to ask questions.',
      shortDescription: 'Welcoming space for new Muslims.',
      hostId: hosts[0].id,
      type: EventType.DINNER,
      theme: EventTheme.CELEBRATION,
      city: 'London',
      country: 'United Kingdom',
      venueName: 'Taste of Lahore',
      address: '76 Wilton Road, London SW1V 1DE',
      latitude: 51.4938,
      longitude: -0.1441,
      chapterId: londonChapter?.id,
      dateTime: new Date(nextWeek.getTime() + 5 * 24 * 60 * 60 * 1000),
      capacity: 20,
      price: 0,
      isSinglesEvent: false,
      status: EventStatus.PUBLISHED,
      coverImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200',
    },
    {
      title: 'Graduate Students Mixer',
      description: 'Meet other Muslim postgraduate students. Share experiences about balancing studies and faith.',
      shortDescription: 'Social dinner for Muslim postgraduate students.',
      hostId: hosts[0].id,
      type: EventType.DINNER,
      theme: EventTheme.SOCIAL,
      city: 'London',
      country: 'United Kingdom',
      venueName: 'Roti Chai',
      address: '8 Market Place, London W1W 8AG',
      latitude: 51.5145,
      longitude: -0.1429,
      chapterId: londonChapter?.id,
      dateTime: new Date(twoWeeks.getTime() + 5 * 24 * 60 * 60 * 1000),
      capacity: 15,
      price: 0,
      isSinglesEvent: false,
      status: EventStatus.PUBLISHED,
      coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200',
    },
    {
      title: 'Eid Gift Exchange Dinner',
      description: 'Bring a small gift and enjoy dinner with the community. Secret Santa style gift exchange.',
      shortDescription: 'Gift exchange dinner for the community.',
      hostId: hosts[1].id,
      type: EventType.DINNER,
      theme: EventTheme.EID,
      city: 'Birmingham',
      country: 'United Kingdom',
      venueName: 'Asha\'s',
      address: '12-22 Newhall Street, Birmingham B3 3LX',
      latitude: 52.4814,
      longitude: -1.8985,
      chapterId: birminghamChapter?.id,
      dateTime: new Date(nextMonth.getTime() + 7 * 24 * 60 * 60 * 1000),
      capacity: 30,
      price: 25,
      isSinglesEvent: false,
      status: EventStatus.PUBLISHED,
      coverImage: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1200',
    },
    {
      title: 'Book Club Dinner',
      description: 'Monthly book club with dinner. This month we are reading The Forty Rules of Love.',
      shortDescription: 'Book club discussion over dinner.',
      hostId: hosts[2].id,
      type: EventType.DINNER,
      theme: EventTheme.SOCIAL,
      city: 'Manchester',
      country: 'United Kingdom',
      venueName: 'The Refuge',
      address: 'Oxford Street, Manchester M60 7HA',
      latitude: 53.4743,
      longitude: -2.2422,
      chapterId: manchesterChapter?.id,
      dateTime: new Date(nextWeek.getTime() + 7 * 24 * 60 * 60 * 1000),
      capacity: 12,
      price: 0,
      isSinglesEvent: false,
      status: EventStatus.PUBLISHED,
      coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200',
    },
  ]

  const createdEvents = []
  for (const eventData of eventsData) {
    const event = await prisma.event.upsert({
      where: { 
        id: eventData.hostId + eventData.title.substring(0, 10) 
      },
      update: {},
      create: eventData as any,
    })
    createdEvents.push(event)
  }

  return createdEvents
}

async function createRSVPs(users: any[], events: any[]) {
  const members = users.filter((u: any) => u.role === UserRole.MEMBER || u.role === UserRole.HOST)
  
  // Create some RSVPs for the first few events
  for (let i = 0; i < Math.min(5, events.length); i++) {
    const event = events[i]
    const numRSVPs = Math.min(members.length, Math.floor(event.capacity * 0.7))
    
    for (let j = 0; j < numRSVPs; j++) {
      await prisma.rSVP.upsert({
        where: {
          eventId_userId: {
            eventId: event.id,
            userId: members[j].id,
          }
        },
        update: {},
        create: {
          eventId: event.id,
          userId: members[j].id,
          status: 'GOING',
        },
      })
    }
  }
}

async function createComments(users: any[], events: any[]) {
  const members = users.filter((u: any) => u.role === UserRole.MEMBER || u.role === UserRole.HOST)
  
  const comments = [
    'Looking forward to this!',
    'Can not wait to meet everyone.',
    'Is there parking available nearby?',
    'Will dietary restrictions be accommodated?',
    'Excited for this event!',
    'Thanks for organizing!',
  ]

  for (const event of events.slice(0, 5)) {
    for (let i = 0; i < Math.min(3, members.length); i++) {
      await prisma.comment.create({
        data: {
          eventId: event.id,
          userId: members[i].id,
          body: comments[Math.floor(Math.random() * comments.length)],
        },
      })
    }
  }
}

async function createReviews(users: any[], events: any[]) {
  const members = users.filter((u: any) => u.role === UserRole.MEMBER)
  
  const reviews = [
    { rating: 5, body: 'Amazing experience! Great food and even better company.' },
    { rating: 5, body: 'Met some wonderful people. Will definitely attend again.' },
    { rating: 4, body: 'Well organized and friendly atmosphere.' },
    { rating: 5, body: 'The host was fantastic and the venue was perfect.' },
    { rating: 4, body: 'Great food and conversation. Highly recommend!' },
  ]

  // Add reviews to past events (first 3 events treated as completed)
  for (const event of events.slice(0, 3)) {
    for (let i = 0; i < Math.min(2, members.length); i++) {
      const review = reviews[Math.floor(Math.random() * reviews.length)]
      await prisma.review.upsert({
        where: {
          eventId_userId: {
            eventId: event.id,
            userId: members[i].id,
          }
        },
        update: {},
        create: {
          eventId: event.id,
          userId: members[i].id,
          rating: review.rating,
          body: review.body,
        },
      })
    }
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })