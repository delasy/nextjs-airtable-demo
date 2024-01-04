import Airtable from 'airtable'

const airtable = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
})

const base = airtable.base(process.env.AIRTABLE_BASE)

export async function POST (request) {
  const { email, fullName, notes } = await request.json()

  const record = await base('Form Submissions').create({
    Email: email,
    'Full Name': fullName,
    Notes: notes
  })

  return Response.json(record)
}
