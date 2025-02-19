const account = await stripe.accounts.create({
    country: 'GB',
    email: 'email',
    business_type: 'individual',
    business_profile: {
      mcc: '7372',
      url: 'https://smr3.co.uk',
    },
    capabilities: {
      transfers: { requested: true },
      card_payments: { requested: true },
    },
    tos_acceptance: {
      date: Math.floor(Date.now() / 1000), // Current time in seconds
      ip: ip, // Replace with the user's actual IP address
    },
    controller: {
      fees: {
        payer: 'application',
      },
      losses: {
        payments: 'application',
      },
      requirement_collection: 'application',
      stripe_dashboard: {
        type: 'none',
      },
    },
    individual: {
      first_name: 'firstname',
      last_name: 'lastname',
      phone: '+447405748652',
      address: {
        city: 'London',
        line1: 'Hampden Road',
        postal_code: 'HA3 5PS',
      },
      dob: {
        day: 6,
        month: 9,
        year: 1994,
      },
      email: 'email',
    },
  });