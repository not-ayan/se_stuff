import { DFDProblem } from '../types';

export const DFD_PROBLEMS: DFDProblem[] = [
  {
    id: 'tas-master',
    problemNumber: 0,
    title: 'Trading-House Automation System (TAS) [Master Worked Example]',
    systemName: 'Trading-House Automation System',
    requirement: `A large trading house wants software to automate the book-keeping activities of its business. It has many regular customers, who place orders for various kinds of commodities. The trading house maintains the name and address of every regular customer, and each is assigned a unique customer identification number (CIN).
When a customer places an order, the accounts department first checks credit-worthiness from past bills. If not credit-worthy, the order is rejected with an order-rejection message.
If credit-worthy, ordered items are checked against handled items; unhandled items generate an apology message. Available items in inventory generate a printed bill and material issue slip, and inventory is decremented.
If an ordered item is unavailable in sufficient quantity, it is recorded in a "pending-order" file with quantity and CIN.
Periodically, the purchase department issues a command to generate indents: the system tallies pending orders, finds vendors supplying those items from a vendor file, and prints indents.
The system also answers managerial queries: given a time period, it reports quantity sold and price realized for each item from sales statistics.`,
    externalEntities: [
      { name: 'Customer', inputs: ['order'], outputs: ['bill + material-issue-slip', 'reject-message', 'apology-message'] },
      { name: 'Purchase Department', inputs: ['generate-indent (command)'], outputs: ['indents'] },
      { name: 'Manager', inputs: ['query (period)'], outputs: ['sales-statistics'] }
    ],
    candidateFunctions: [
      { id: '0.1', name: 'Accept-order', triggeredBy: 'Customer places order', description: 'Checks customer credit-worthiness against past history; accepts or rejects.' },
      { id: '0.2', name: 'Process-order', triggeredBy: 'Order accepted', description: 'Checks catalog and inventory; prints bills/slips for available stock; logs pending orders.' },
      { id: '0.3', name: 'Handle-query', triggeredBy: 'Manager requests statistics', description: 'Searches sales statistics for specified period and computes revenue.' },
      { id: '0.4', name: 'Handle-indent-request', triggeredBy: 'Purchase dept triggers indent generation', description: 'Tallies pending orders, matches vendor addresses, and prints purchase indents.' }
    ],
    dataStores: [
      'Customer-file',
      'Customer-history',
      'Item-file',
      'Inventory',
      'Accepted-orders',
      'Pending-order',
      'Vendor-list',
      'Sales-statistics'
    ],
    level0: {
      systemBubble: 'Trading-House Automation System (0)',
      flows: [
        { from: 'Customer', to: '0', label: 'order' },
        { from: '0', to: 'Customer', label: 'response (bill+slip or reject)' },
        { from: 'Purchase Department', to: '0', label: 'generate-indent' },
        { from: '0', to: 'Purchase Department', label: 'indents' },
        { from: 'Manager', to: '0', label: 'query' },
        { from: '0', to: 'Manager', label: 'statistics' }
      ]
    },
    level1: {
      bubbles: [
        {
          id: '0.1',
          name: 'Accept-order',
          readsFrom: ['Customer-file', 'Customer-history'],
          writesTo: [],
          inputs: ['order (Customer)'],
          outputs: ['reject-message (Customer)', 'accepted-order (to 0.2)']
        },
        {
          id: '0.2',
          name: 'Process-order',
          readsFrom: ['Item-file', 'Inventory'],
          writesTo: ['Inventory', 'Accepted-orders', 'Pending-order', 'Sales-statistics'],
          inputs: ['accepted-order (from 0.1)'],
          outputs: ['bill + issue slip (Customer)']
        },
        {
          id: '0.3',
          name: 'Handle-query',
          readsFrom: ['Sales-statistics'],
          writesTo: [],
          inputs: ['query (Manager)'],
          outputs: ['statistics (Manager)']
        },
        {
          id: '0.4',
          name: 'Handle-indent-request',
          readsFrom: ['Pending-order', 'Vendor-list'],
          writesTo: [],
          inputs: ['generate-indent (Purchase Dept)'],
          outputs: ['indents (Purchase Dept)']
        }
      ]
    },
    level2FocusBubble: '0.2 Process-order',
    level2SubBubbles: [
      {
        id: '0.2.1',
        name: 'Validate-items',
        description: 'Verifies whether ordered items are in the trading house catalog.',
        inputs: ['accepted-order', 'Item-file'],
        outputs: ['valid-items', 'reject-message (for unhandled items)']
      },
      {
        id: '0.2.2',
        name: 'Check-availability',
        description: 'Checks inventory for stock sufficiency; branches into available and short items.',
        inputs: ['valid-items', 'Inventory'],
        outputs: ['available-items', 'short-items', 'inventory decrement']
      },
      {
        id: '0.2.3',
        name: 'Generate-documents',
        description: 'Calculates prices and prints final bill and material-issue-slip for customer.',
        inputs: ['available-items'],
        outputs: ['bill + material-issue-slip', 'sold-items']
      },
      {
        id: '0.2.4',
        name: 'Update-records',
        description: 'Logs sold items to Accepted-orders and backlogged items to Pending-order.',
        inputs: ['sold-items', 'short-items'],
        outputs: ['Accepted-orders log', 'Pending-order log', 'Sales-statistics update']
      }
    ],
    sampleDataDictionary: [
      { name: 'order', definition: 'customer-id + {item + quantity}* + order#' },
      { name: 'response', definition: '[bill + material-issue-slip, reject-message]' },
      { name: 'bill', definition: '{item + quantity + price}* + total-amount + customer-address + order#' },
      { name: 'material-issue-slip', definition: 'message + item + quantity + customer-address' },
      { name: 'statistics', definition: '{item + quantity + price}*' },
      { name: 'indents', definition: '{indent}*' }
    ]
  },
  {
    id: 'dfd-prob-1',
    problemNumber: 1,
    title: 'Problem 1: Community Library Automation System',
    systemName: 'Community Library Automation System',
    requirement: `A public library wants to automate the issue and return of books. Every member holds a library card with a unique membership number, and the library maintains each member's name, address, and the maximum number of books they may borrow at once.
When a member presents a book at the counter, the clerk checks whether the member's borrowing limit has already been reached and whether the member has any unpaid fines; if either is true, the book is not issued and a message is printed for the member. Otherwise, the book is issued, the loan is recorded against the member's card, and a due date fourteen days later is stamped on the book.
When a book is returned, the clerk checks the due date against today's date. If the book is overdue, a fine is calculated at a fixed rate per day and added to the member's outstanding balance; a receipt showing the fine is printed. The loan record is then closed and the book is marked available again.
The library also wants the system to let the clerk search the catalogue by title or author to check whether a book is currently available, and to let the librarian generate a weekly list of all books still overdue, addressed to the members concerned.`,
    externalEntities: [
      { name: 'Member', inputs: ['book-loan-request', 'book-return'], outputs: ['reject/fine-message', 'due-date-stamp', 'fine-receipt'] },
      { name: 'Clerk', inputs: ['catalogue-search-query'], outputs: ['catalogue-search-results'] },
      { name: 'Librarian', inputs: ['generate-overdue-request'], outputs: ['weekly-overdue-list'] }
    ],
    candidateFunctions: [
      { id: '0.1', name: 'Issue-book', triggeredBy: 'Member presents book', description: 'Checks loan limits and unpaid fines; records 14-day loan.' },
      { id: '0.2', name: 'Return-book', triggeredBy: 'Member returns book', description: 'Computes overdue fine, updates fines ledger, closes loan record.' },
      { id: '0.3', name: 'Search-catalogue', triggeredBy: 'Clerk searches title/author', description: 'Queries catalog database for book availability and shelf location.' },
      { id: '0.4', name: 'Generate-overdue-list', triggeredBy: 'Librarian weekly command', description: 'Extracts overdue loans and compiles notices with member addresses.' }
    ],
    dataStores: ['Member-file', 'Catalogue-store', 'Loan-records', 'Fines-ledger'],
    level0: {
      systemBubble: 'Library Automation System (0)',
      flows: [
        { from: 'Member', to: '0', label: 'loan-request / return' },
        { from: '0', to: 'Member', label: 'receipt / reject-notice' },
        { from: 'Clerk', to: '0', label: 'search-query' },
        { from: '0', to: 'Clerk', label: 'search-results' },
        { from: 'Librarian', to: '0', label: 'request-overdue-list' },
        { from: '0', to: 'Librarian', label: 'overdue-notices' }
      ]
    },
    level1: {
      bubbles: [
        { id: '0.1', name: 'Issue-book', readsFrom: ['Member-file', 'Loan-records', 'Fines-ledger'], writesTo: ['Loan-records', 'Catalogue-store'], inputs: ['loan-request'], outputs: ['due-date-stamp', 'rejection-slip'] },
        { id: '0.2', name: 'Return-book', readsFrom: ['Loan-records'], writesTo: ['Loan-records', 'Catalogue-store', 'Fines-ledger'], inputs: ['book-return'], outputs: ['fine-receipt'] },
        { id: '0.3', name: 'Search-catalogue', readsFrom: ['Catalogue-store'], writesTo: [], inputs: ['search-query'], outputs: ['search-results'] },
        { id: '0.4', name: 'Generate-overdue-list', readsFrom: ['Loan-records', 'Member-file'], writesTo: [], inputs: ['generate-command'], outputs: ['weekly-overdue-list'] }
      ]
    },
    level2FocusBubble: '0.1 Issue-book',
    level2SubBubbles: [
      { id: '0.1.1', name: 'Validate-member-status', description: 'Checks borrowing quota and unpaid fines balance.', inputs: ['member-id', 'Member-file', 'Fines-ledger'], outputs: ['eligible-status', 'rejection-notice'] },
      { id: '0.1.2', name: 'Check-book-availability', description: 'Verifies book is on shelf and not reserved.', inputs: ['book-id', 'Catalogue-store'], outputs: ['book-status'] },
      { id: '0.1.3', name: 'Record-loan', description: 'Creates active loan with 14-day due date.', inputs: ['eligible-status', 'book-status'], outputs: ['Loan-records write', 'Catalogue mark checked-out', 'due-date-stamp'] }
    ]
  },
  {
    id: 'dfd-prob-2',
    problemNumber: 2,
    title: 'Problem 2: Outpatient Appointment System for a Clinic',
    systemName: 'Clinic Outpatient Appointment System',
    requirement: `A multi-doctor clinic wants to computerize booking of outpatient appointments. A patient calls reception and requests an appointment with a particular doctor, or any available doctor in a specialty, for a preferred date.
The receptionist checks schedule; if an open slot exists, it is reserved and confirmation slip printed. If full, offered next open slot or placed on waiting list.
On the day of visit, patient checks in; receptionist marks appointment arrived and pulls up patient history for doctor.
After consultation, doctor records diagnosis and prescribed medicines against patient file, and visit summary is printed for patient.
Clinic administrator requests daily appointment list per doctor and monthly consultation count per specialty for billing.`,
    externalEntities: [
      { name: 'Patient', inputs: ['booking-request', 'check-in'], outputs: ['confirmation-slip', 'visit-summary'] },
      { name: 'Receptionist', inputs: ['booking-entry', 'check-in-command'], outputs: ['schedule-display'] },
      { name: 'Doctor', inputs: ['consultation-notes', 'prescriptions'], outputs: ['patient-history-view'] },
      { name: 'Administrator', inputs: ['report-request'], outputs: ['daily-doctor-schedule', 'monthly-specialty-summary'] }
    ],
    candidateFunctions: [
      { id: '0.1', name: 'Book-appointment', triggeredBy: 'Patient calls for booking', description: 'Checks doctor slots; books appointment or enqueues on waiting list.' },
      { id: '0.2', name: 'Check-in-patient', triggeredBy: 'Patient arrives at desk', description: 'Marks status as arrived; pulls patient medical history.' },
      { id: '0.3', name: 'Record-consultation', triggeredBy: 'Doctor completes visit', description: 'Stores diagnosis and prescription in patient file; prints patient summary.' },
      { id: '0.4', name: 'Generate-admin-reports', triggeredBy: 'Administrator request', description: 'Compiles doctor schedules and specialty billing aggregates.' }
    ],
    dataStores: ['Doctor-schedules', 'Appointments-file', 'Patient-records', 'Specialty-ledger'],
    level0: {
      systemBubble: 'Outpatient Clinic System (0)',
      flows: [
        { from: 'Patient', to: '0', label: 'appointment-request' },
        { from: '0', to: 'Patient', label: 'confirmation-slip / summary' },
        { from: 'Doctor', to: '0', label: 'diagnosis / prescriptions' },
        { from: 'Administrator', to: '0', label: 'report-query' },
        { from: '0', to: 'Administrator', label: 'statistical-reports' }
      ]
    },
    level1: {
      bubbles: [
        { id: '0.1', name: 'Book-appointment', readsFrom: ['Doctor-schedules'], writesTo: ['Appointments-file'], inputs: ['booking-request'], outputs: ['confirmation-slip'] },
        { id: '0.2', name: 'Check-in-patient', readsFrom: ['Appointments-file', 'Patient-records'], writesTo: ['Appointments-file'], inputs: ['check-in'], outputs: ['patient-history (Doctor)'] },
        { id: '0.3', name: 'Record-consultation', readsFrom: [], writesTo: ['Patient-records', 'Specialty-ledger'], inputs: ['diagnosis-notes'], outputs: ['visit-summary (Patient)'] },
        { id: '0.4', name: 'Generate-admin-reports', readsFrom: ['Appointments-file', 'Specialty-ledger'], writesTo: [], inputs: ['report-query'], outputs: ['daily-list', 'monthly-count'] }
      ]
    },
    level2FocusBubble: '0.1 Book-appointment',
    level2SubBubbles: [
      { id: '0.1.1', name: 'Check-schedule-slot', description: 'Searches open calendar slots for requested doctor or specialty.', inputs: ['doctor-id', 'preferred-date', 'Doctor-schedules'], outputs: ['available-slot', 'slot-full-flag'] },
      { id: '0.1.2', name: 'Reserve-slot', description: 'Locks slot and records patient details in appointment book.', inputs: ['available-slot', 'patient-details'], outputs: ['Appointments-file write', 'confirmation-slip'] },
      { id: '0.1.3', name: 'Enqueue-waiting-list', description: 'Enqueues patient into priority waiting list if requested slot is full.', inputs: ['slot-full-flag', 'patient-details'], outputs: ['Waiting-list update', 'waitlist-slip'] }
    ]
  },
  {
    id: 'dfd-prob-3',
    problemNumber: 3,
    title: 'Problem 3: Hotel Room Reservation System',
    systemName: 'Hotel Room Reservation System',
    requirement: `A mid-sized hotel manages room bookings. Guests specify check-in/out dates and room type. Front desk checks availability across dates; if free, reserves under guest contact details and prints confirmation. If unavailable, nearest alternative dates or room types are offered.
Upon arrival, clerk checks in guest, assigns specific room number, issues key and registration card. Room charges and additional services (room service, laundry) accumulate on running bill.
At check-out, clerk totals bill, takes payment, prints final invoice, and marks room as needing housekeeping.
Hotel manager requests occupancy reports across date ranges showing room types booked.`,
    externalEntities: [
      { name: 'Guest', inputs: ['booking-inquiry', 'check-in-req', 'service-order', 'checkout-payment'], outputs: ['booking-confirmation', 'reg-card+key', 'final-invoice'] },
      { name: 'Front-desk Clerk', inputs: ['room-assign', 'service-entry'], outputs: ['availability-screen'] },
      { name: 'Hotel Manager', inputs: ['occupancy-query'], outputs: ['occupancy-report'] },
      { name: 'Housekeeping', inputs: ['room-cleaned-notice'], outputs: ['cleaning-work-orders'] }
    ],
    candidateFunctions: [
      { id: '0.1', name: 'Reserve-room', triggeredBy: 'Guest makes booking', description: 'Checks inventory across date span, reserves room, prints confirmation.' },
      { id: '0.2', name: 'Check-in-guest', triggeredBy: 'Guest arrives', description: 'Assigns room number, creates folio, prints registration card.' },
      { id: '0.3', name: 'Manage-charges-and-checkout', triggeredBy: 'Service request or checkout', description: 'Posts incidentals, calculates taxes, takes payment, flags room for housekeeping.' },
      { id: '0.4', name: 'Generate-occupancy-report', triggeredBy: 'Manager requests report', description: 'Aggregates booked vs vacant room statistics over date range.' }
    ],
    dataStores: ['Room-inventory', 'Reservations-store', 'Guest-folios', 'Housekeeping-queue', 'Occupancy-ledger'],
    level0: {
      systemBubble: 'Hotel Reservation System (0)',
      flows: [
        { from: 'Guest', to: '0', label: 'reservation / service requests' },
        { from: '0', to: 'Guest', label: 'confirmation / invoices' },
        { from: 'Manager', to: '0', label: 'occupancy-query' },
        { from: '0', to: 'Manager', label: 'occupancy-report' },
        { from: '0', to: 'Housekeeping', label: 'rooms-to-clean' }
      ]
    },
    level1: {
      bubbles: [
        { id: '0.1', name: 'Reserve-room', readsFrom: ['Room-inventory'], writesTo: ['Reservations-store', 'Room-inventory'], inputs: ['dates + room-type'], outputs: ['confirmation-slip'] },
        { id: '0.2', name: 'Check-in-guest', readsFrom: ['Reservations-store', 'Room-inventory'], writesTo: ['Guest-folios', 'Room-inventory'], inputs: ['guest-arrival'], outputs: ['reg-card + key-card'] },
        { id: '0.3', name: 'Manage-charges-and-checkout', readsFrom: ['Guest-folios'], writesTo: ['Guest-folios', 'Housekeeping-queue', 'Occupancy-ledger'], inputs: ['services / payment'], outputs: ['final-invoice'] },
        { id: '0.4', name: 'Generate-occupancy-report', readsFrom: ['Occupancy-ledger', 'Room-inventory'], writesTo: [], inputs: ['date-range'], outputs: ['occupancy-report'] }
      ]
    },
    level2FocusBubble: '0.3 Manage-charges-and-checkout',
    level2SubBubbles: [
      { id: '0.3.1', name: 'Post-incidental-charge', description: 'Adds laundry or room service orders to running guest folio.', inputs: ['service-slip', 'Guest-folios'], outputs: ['folio-update'] },
      { id: '0.3.2', name: 'Compute-bill-total', description: 'Calculates room nights, incidentals, and applicable tax.', inputs: ['checkout-request', 'Guest-folios'], outputs: ['total-amount-due'] },
      { id: '0.3.3', name: 'Process-payment-and-release', description: 'Processes credit card / cash, prints invoice, marks room status dirty.', inputs: ['payment-data'], outputs: ['final-invoice', 'Housekeeping-queue write', 'Occupancy-ledger write'] }
    ]
  },
  {
    id: 'dfd-prob-4',
    problemNumber: 4,
    title: 'Problem 4: Courier Parcel Tracking System',
    systemName: 'Courier Parcel Tracking System',
    requirement: `A courier company tracks parcels from pickup to delivery. Customer books pickup giving sender/receiver address, parcel weight, delivery speed. Clerk calculates charge from rate table (weight, distance, speed), prints shipping label with unique tracking number.
At each transit network hub, parcel barcode is scanned and location/timestamp logged in tracking record.
Customer can submit tracking number at any time to receive status and transit history.
At destination hub, agent attempts delivery. If receiver is unavailable, attempt is logged and re-delivery scheduled up to 3 times, after which parcel is returned to sender.
Once delivered, receiver signs, and proof-of-delivery (POD) is stored for sender. Operations manager requests report of all parcels overdue against promised delivery dates.`,
    externalEntities: [
      { name: 'Customer / Sender', inputs: ['pickup-booking', 'tracking-query'], outputs: ['shipping-label', 'tracking-status', 'proof-of-delivery'] },
      { name: 'Transit Hub Scanner', inputs: ['barcode-scan-event'], outputs: [] },
      { name: 'Delivery Agent', inputs: ['delivery-outcome (signed or failed)'], outputs: ['daily-manifest'] },
      { name: 'Operations Manager', inputs: ['overdue-report-query'], outputs: ['overdue-parcels-report'] }
    ],
    candidateFunctions: [
      { id: '0.1', name: 'Book-and-rate-parcel', triggeredBy: 'Customer requests pickup', description: 'Calculates shipping fee, generates tracking number, prints barcoded label.' },
      { id: '0.2', name: 'Log-transit-hub-scan', triggeredBy: 'Hub scanner scans barcode', description: 'Appends current hub location and timestamp to parcel tracking record.' },
      { id: '0.3', name: 'Process-delivery-attempt', triggeredBy: 'Agent records delivery', description: 'Stores signature POD if delivered; reschedules or initiates return if 3 failed attempts.' },
      { id: '0.4', name: 'Handle-inquiry-and-overdue', triggeredBy: 'Customer query or manager request', description: 'Returns real-time tracking history or compiles SLA overdue report.' }
    ],
    dataStores: ['Rate-table', 'Parcel-tracking-ledger', 'Delivery-manifests', 'Proof-of-delivery-store'],
    level0: {
      systemBubble: 'Courier Tracking System (0)',
      flows: [
        { from: 'Customer / Sender', to: '0', label: 'parcel-details / tracking-num' },
        { from: '0', to: 'Customer / Sender', label: 'shipping-label / parcel-history' },
        { from: 'Transit Hub Scanner', to: '0', label: 'scan-event' },
        { from: 'Delivery Agent', to: '0', label: 'delivery-attempt-status' },
        { from: '0', to: 'Delivery Agent', label: 'manifest' },
        { from: 'Operations Manager', to: '0', label: 'request-overdue-report' },
        { from: '0', to: 'Operations Manager', label: 'overdue-report' }
      ]
    },
    level1: {
      bubbles: [
        { id: '0.1', name: 'Book-and-rate-parcel', readsFrom: ['Rate-table'], writesTo: ['Parcel-tracking-ledger'], inputs: ['weight + address + speed'], outputs: ['shipping-label'] },
        { id: '0.2', name: 'Log-transit-hub-scan', readsFrom: [], writesTo: ['Parcel-tracking-ledger'], inputs: ['scan-event'], outputs: [] },
        { id: '0.3', name: 'Process-delivery-attempt', readsFrom: ['Parcel-tracking-ledger'], writesTo: ['Parcel-tracking-ledger', 'Proof-of-delivery-store'], inputs: ['attempt-result + signature'], outputs: ['POD-acknowledgment'] },
        { id: '0.4', name: 'Handle-inquiry-and-overdue', readsFrom: ['Parcel-tracking-ledger'], writesTo: [], inputs: ['tracking-query / overdue-req'], outputs: ['tracking-status', 'overdue-report'] }
      ]
    },
    level2FocusBubble: '0.3 Process-delivery-attempt',
    level2SubBubbles: [
      { id: '0.3.1', name: 'Verify-delivery-outcome', description: 'Checks if receiver signed or was unavailable.', inputs: ['agent-submission'], outputs: ['signed-event', 'failed-attempt-event'] },
      { id: '0.3.2', name: 'Record-successful-delivery', description: 'Stores signature and timestamps in POD store; marks parcel delivered.', inputs: ['signed-event'], outputs: ['POD-store write', 'status-delivered'] },
      { id: '0.3.3', name: 'Schedule-redelivery-or-return', description: 'Increments attempt counter; if attempts < 3 schedules re-delivery, else marks return-to-sender.', inputs: ['failed-attempt-event', 'Parcel-tracking-ledger'], outputs: ['reschedule-record', 'return-flag'] }
    ]
  },
  {
    id: 'dfd-prob-5',
    problemNumber: 5,
    title: 'Problem 5: University Course Registration System',
    systemName: 'University Course Registration System',
    requirement: `A university automates course registration at semester start. Student logs in with roll number, selects courses. System checks prerequisite completion and that course seat limit has not been reached; failing either check rejects course with explanation.
Passing courses are placed on provisional timetable; system checks for schedule clashes.
Once student confirms, registration is finalized, course seats are decremented, printed registration slip is generated.
Finance office is notified to bill student account.
Faculty members can request class lists once registration closes. Academic office receives report showing enrollment numbers for each course to plan next semester sections.`,
    externalEntities: [
      { name: 'Student', inputs: ['course-selections', 'confirmation'], outputs: ['provisional-timetable', 'registration-slip', 'rejection-notice'] },
      { name: 'Finance Office', inputs: [], outputs: ['billing-notification'] },
      { name: 'Faculty Member', inputs: ['class-list-request'], outputs: ['class-roster'] },
      { name: 'Academic Office', inputs: ['enrollment-query'], outputs: ['semester-enrollment-report'] }
    ],
    candidateFunctions: [
      { id: '0.1', name: 'Validate-course-selection', triggeredBy: 'Student selects courses', description: 'Verifies prerequisites, quota, and schedule clashes; outputs provisional timetable.' },
      { id: '0.2', name: 'Finalize-registration', triggeredBy: 'Student confirms timetable', description: 'Decrements seats, issues registration slip, notifies finance office.' },
      { id: '0.3', name: 'Generate-faculty-roster', triggeredBy: 'Faculty requests class list', description: 'Extracts enrolled students for requested course after registration closes.' },
      { id: '0.4', name: 'Compile-enrollment-stats', triggeredBy: 'Academic office request', description: 'Computes total enrollments per course for curriculum planning.' }
    ],
    dataStores: ['Student-history', 'Course-catalog', 'Timetable-schedule', 'Registration-store', 'Billing-queue'],
    level0: {
      systemBubble: 'Course Registration System (0)',
      flows: [
        { from: 'Student', to: '0', label: 'roll-number + course-picks' },
        { from: '0', to: 'Student', label: 'registration-slip' },
        { from: '0', to: 'Finance Office', label: 'billing-data' },
        { from: 'Faculty Member', to: '0', label: 'class-list-query' },
        { from: '0', to: 'Faculty Member', label: 'class-roster' },
        { from: 'Academic Office', to: '0', label: 'stats-query' },
        { from: '0', to: 'Academic Office', label: 'enrollment-stats' }
      ]
    },
    level1: {
      bubbles: [
        { id: '0.1', name: 'Validate-course-selection', readsFrom: ['Student-history', 'Course-catalog', 'Timetable-schedule'], writesTo: [], inputs: ['course-picks'], outputs: ['provisional-timetable', 'rejection-reason'] },
        { id: '0.2', name: 'Finalize-registration', readsFrom: ['Course-catalog'], writesTo: ['Course-catalog', 'Registration-store', 'Billing-queue'], inputs: ['confirm-submission'], outputs: ['registration-slip', 'billing-notice'] },
        { id: '0.3', name: 'Generate-faculty-roster', readsFrom: ['Registration-store', 'Student-history'], writesTo: [], inputs: ['class-list-request'], outputs: ['class-roster'] },
        { id: '0.4', name: 'Compile-enrollment-stats', readsFrom: ['Registration-store', 'Course-catalog'], writesTo: [], inputs: ['stats-query'], outputs: ['enrollment-report'] }
      ]
    },
    level2FocusBubble: '0.1 Validate-course-selection',
    level2SubBubbles: [
      { id: '0.1.1', name: 'Check-prerequisites', description: 'Compares student transcript against course prerequisite rules.', inputs: ['student-history', 'course-prereqs'], outputs: ['prereq-pass', 'prereq-fail'] },
      { id: '0.1.2', name: 'Check-seat-capacity', description: 'Verifies remaining seats in course section.', inputs: ['prereq-pass', 'Course-catalog'], outputs: ['seat-available', 'seat-full'] },
      { id: '0.1.3', name: 'Check-timetable-conflict', description: 'Checks if lecture times clash on weekly calendar.', inputs: ['seat-available', 'Timetable-schedule'], outputs: ['provisional-timetable', 'clash-warning'] }
    ]
  },
  {
    id: 'dfd-prob-6',
    problemNumber: 6,
    title: 'Problem 6: Restaurant Table & Order Management System',
    systemName: 'Restaurant Table and Order Management System',
    requirement: `When customers arrive, host checks seating chart for free table and assigns it, marking it occupied.
Waiter enters dish orders and special instructions; system checks daily menu availability; unavailable items flagged immediately.
Confirmed order sent to kitchen display, split into tickets for starters, mains, and desserts stations. Each station marks items ready; waiter is notified to serve.
When leaving, waiter requests bill; system totals order, applies discount, prints itemized bill. Once payment is recorded, table marked free.
Manager requests total daily sales report broken down by menu category.`,
    externalEntities: [
      { name: 'Customer / Host', inputs: ['arrival-party-size'], outputs: ['table-assignment'] },
      { name: 'Waiter', inputs: ['order-entry', 'bill-request', 'payment-received'], outputs: ['item-availability-flag', 'course-ready-alert', 'itemized-bill'] },
      { name: 'Kitchen Stations', inputs: ['course-ready-signal'], outputs: ['station-tickets (starters/mains/desserts)'] },
      { name: 'Restaurant Manager', inputs: ['daily-sales-query'], outputs: ['category-sales-report'] }
    ],
    candidateFunctions: [
      { id: '0.1', name: 'Assign-table', triggeredBy: 'Party arrives', description: 'Allocates table based on capacity and marks table occupied.' },
      { id: '0.2', name: 'Process-order', triggeredBy: 'Waiter inputs order', description: 'Validates daily menu stock and routes kitchen tickets to stations.' },
      { id: '0.3', name: 'Track-kitchen-readiness', triggeredBy: 'Station finishes cooking', description: 'Coordinates course pacing and alerts waiter when dishes are ready.' },
      { id: '0.4', name: 'Settle-bill-and-vacate', triggeredBy: 'Customer requests check', description: 'Computes bill, discounts, logs payment, and marks table vacant.' },
      { id: '0.5', name: 'Generate-sales-report', triggeredBy: 'Manager request', description: 'Compiles sales revenue grouped by menu categories.' }
    ],
    dataStores: ['Table-inventory', 'Menu-catalog', 'Active-orders', 'Sales-ledger'],
    level0: {
      systemBubble: 'Restaurant Order System (0)',
      flows: [
        { from: 'Host', to: '0', label: 'party-size' },
        { from: '0', to: 'Host', label: 'table-number' },
        { from: 'Waiter', to: '0', label: 'order-items / payment' },
        { from: '0', to: 'Waiter', label: 'dish-ready-alert / bill' },
        { from: '0', to: 'Kitchen Stations', label: 'split-tickets' },
        { from: 'Manager', to: '0', label: 'sales-query' },
        { from: '0', to: 'Manager', label: 'category-sales-report' }
      ]
    },
    level1: {
      bubbles: [
        { id: '0.1', name: 'Assign-table', readsFrom: ['Table-inventory'], writesTo: ['Table-inventory'], inputs: ['party-size'], outputs: ['table-assigned'] },
        { id: '0.2', name: 'Process-order', readsFrom: ['Menu-catalog'], writesTo: ['Active-orders'], inputs: ['order-items'], outputs: ['station-tickets', 'unavail-flag'] },
        { id: '0.3', name: 'Track-kitchen-readiness', readsFrom: ['Active-orders'], writesTo: ['Active-orders'], inputs: ['course-ready-ping'], outputs: ['waiter-alert'] },
        { id: '0.4', name: 'Settle-bill-and-vacate', readsFrom: ['Active-orders'], writesTo: ['Table-inventory', 'Sales-ledger', 'Active-orders'], inputs: ['bill-request', 'payment'], outputs: ['itemized-bill'] },
        { id: '0.5', name: 'Generate-sales-report', readsFrom: ['Sales-ledger'], writesTo: [], inputs: ['daily-query'], outputs: ['sales-report'] }
      ]
    },
    level2FocusBubble: '0.2 Process-order',
    level2SubBubbles: [
      { id: '0.2.1', name: 'Verify-menu-availability', description: 'Checks if ordered dishes are available on daily special menu.', inputs: ['dishes', 'Menu-catalog'], outputs: ['confirmed-dishes', 'out-of-stock-alert'] },
      { id: '0.2.2', name: 'Split-kitchen-stations', description: 'Categorizes dishes into starter, main course, and dessert tickets.', inputs: ['confirmed-dishes'], outputs: ['starter-ticket', 'main-ticket', 'dessert-ticket'] },
      { id: '0.2.3', name: 'Store-active-order', description: 'Logs order tied to table number into active kitchen queue.', inputs: ['tickets'], outputs: ['Active-orders write'] }
    ]
  },
  {
    id: 'dfd-prob-7',
    problemNumber: 7,
    title: 'Problem 7: Car Rental Booking System',
    systemName: 'Car Rental Booking System',
    requirement: `A customer requests a car of a particular category for pickup at one branch and return at same or different branch over date range. Clerk checks fleet availability; if available, reserves against driving license, issues booking reference and estimated charge.
At pickup, clerk records odometer and fuel level, marks reservation active, hands over keys.
At return, clerk records odometer and fuel again, calculates excess mileage and fuel shortfall, prints final invoice.
If returned to another branch, flagged for repositioning.
Fleet manager requests report showing current location and status (available, rented, maintenance) of every car.`,
    externalEntities: [
      { name: 'Customer', inputs: ['booking-request', 'pickup-license', 'return-payment'], outputs: ['booking-reference', 'car-keys', 'final-invoice'] },
      { name: 'Branch Clerk', inputs: ['odometer-reading', 'fuel-level'], outputs: ['dispatch-screen'] },
      { name: 'Fleet Manager', inputs: ['status-query'], outputs: ['fleet-status-report'] }
    ],
    candidateFunctions: [
      { id: '0.1', name: 'Reserve-car', triggeredBy: 'Customer booking request', description: 'Checks category availability, books against license, calculates estimate.' },
      { id: '0.2', name: 'Dispatch-car', triggeredBy: 'Customer arrives for pickup', description: 'Logs initial odometer and fuel, activates contract, hands over keys.' },
      { id: '0.3', name: 'Process-return', triggeredBy: 'Customer returns car', description: 'Calculates mileage/fuel charges, generates invoice, flags repositioning if needed.' },
      { id: '0.4', name: 'Monitor-fleet', triggeredBy: 'Fleet manager query', description: 'Compiles location and operational status of all vehicles.' }
    ],
    dataStores: ['Fleet-inventory', 'Reservations-ledger', 'Rate-cards', 'Repositioning-queue'],
    level0: {
      systemBubble: 'Car Rental System (0)',
      flows: [
        { from: 'Customer', to: '0', label: 'booking-details / return-data' },
        { from: '0', to: 'Customer', label: 'booking-ref / final-invoice' },
        { from: 'Fleet Manager', to: '0', label: 'fleet-query' },
        { from: '0', to: 'Fleet Manager', label: 'fleet-status-report' }
      ]
    },
    level1: {
      bubbles: [
        { id: '0.1', name: 'Reserve-car', readsFrom: ['Fleet-inventory', 'Rate-cards'], writesTo: ['Reservations-ledger', 'Fleet-inventory'], inputs: ['dates + category'], outputs: ['booking-reference'] },
        { id: '0.2', name: 'Dispatch-car', readsFrom: ['Reservations-ledger'], writesTo: ['Reservations-ledger', 'Fleet-inventory'], inputs: ['pickup-odometer + fuel'], outputs: ['key-handover'] },
        { id: '0.3', name: 'Process-return', readsFrom: ['Reservations-ledger', 'Rate-cards'], writesTo: ['Fleet-inventory', 'Repositioning-queue'], inputs: ['return-odometer + fuel + payment'], outputs: ['final-invoice'] },
        { id: '0.4', name: 'Monitor-fleet', readsFrom: ['Fleet-inventory'], writesTo: [], inputs: ['fleet-query'], outputs: ['fleet-status-report'] }
      ]
    },
    level2FocusBubble: '0.3 Process-return',
    level2SubBubbles: [
      { id: '0.3.1', name: 'Audit-mileage-and-fuel', description: 'Compares return odometer and fuel level with checkout values.', inputs: ['return-metrics', 'Reservations-ledger'], outputs: ['excess-km', 'fuel-deficit'] },
      { id: '0.3.2', name: 'Calculate-final-charges', description: 'Applies penalty rates for extra distance and refueling.', inputs: ['excess-km', 'fuel-deficit', 'Rate-cards'], outputs: ['final-bill-amount'] },
      { id: '0.3.3', name: 'Update-fleet-and-reposition', description: 'Updates vehicle location; flags for inter-branch relocation if drop branch differs from home.', inputs: ['drop-branch', 'home-branch'], outputs: ['Repositioning-queue write', 'Fleet-inventory update'] }
    ]
  },
  {
    id: 'dfd-prob-8',
    problemNumber: 8,
    title: 'Problem 8: Utility Bill Payment System',
    systemName: 'Utility Electricity Billing System',
    requirement: `Each month, meter reader enters current reading against household connection account. System calculates units consumed since previous reading, applies slab-wise tariff, adds unpaid arrears; bill showing units, amount, and due date is printed/mailed.
Customer pays in person or online gateway; payment recorded and receipt issued.
If unpaid by due date, late surcharge added to next bill.
If two consecutive bills remain unpaid, account is flagged for disconnection and notice sent.
Board revenue office requests report of total units billed, amount collected, and list of flagged accounts.`,
    externalEntities: [
      { name: 'Customer', inputs: ['payment-submission'], outputs: ['utility-bill', 'payment-receipt', 'disconnection-notice'] },
      { name: 'Meter Reader', inputs: ['meter-reading-entry'], outputs: [] },
      { name: 'Revenue Office', inputs: ['revenue-report-query'], outputs: ['monthly-revenue-report', 'disconnection-list'] }
    ],
    candidateFunctions: [
      { id: '0.1', name: 'Generate-monthly-bill', triggeredBy: 'Meter reader inputs reading', description: 'Calculates consumption, applies tariff slabs, adds unpaid arrears, prints bill.' },
      { id: '0.2', name: 'Process-payment', triggeredBy: 'Customer makes payment', description: 'Credits account, generates receipt, resets overdue flags if fully settled.' },
      { id: '0.3', name: 'Audit-overdue-and-disconnect', triggeredBy: 'Due date expiry / monthly audit', description: 'Applies surcharge; flags 2-month defaulters and issues disconnection notice.' },
      { id: '0.4', name: 'Generate-revenue-reports', triggeredBy: 'Revenue office query', description: 'Compiles billed vs collected statistics and defaulter accounts.' }
    ],
    dataStores: ['Connection-accounts', 'Tariff-slabs', 'Payments-ledger', 'Disconnection-file'],
    level0: {
      systemBubble: 'Electricity Billing System (0)',
      flows: [
        { from: 'Meter Reader', to: '0', label: 'meter-reading' },
        { from: '0', to: 'Customer', label: 'monthly-bill / receipt / warning' },
        { from: 'Customer', to: '0', label: 'payment' },
        { from: 'Revenue Office', to: '0', label: 'report-request' },
        { from: '0', to: 'Revenue Office', label: 'revenue-summary' }
      ]
    },
    level1: {
      bubbles: [
        { id: '0.1', name: 'Generate-monthly-bill', readsFrom: ['Connection-accounts', 'Tariff-slabs'], writesTo: ['Connection-accounts'], inputs: ['meter-reading'], outputs: ['utility-bill'] },
        { id: '0.2', name: 'Process-payment', readsFrom: ['Connection-accounts'], writesTo: ['Connection-accounts', 'Payments-ledger'], inputs: ['payment-data'], outputs: ['payment-receipt'] },
        { id: '0.3', name: 'Audit-overdue-and-disconnect', readsFrom: ['Connection-accounts'], writesTo: ['Connection-accounts', 'Disconnection-file'], inputs: ['audit-trigger'], outputs: ['disconnection-notice'] },
        { id: '0.4', name: 'Generate-revenue-reports', readsFrom: ['Connection-accounts', 'Payments-ledger', 'Disconnection-file'], writesTo: [], inputs: ['report-query'], outputs: ['revenue-report', 'disconnection-list'] }
      ]
    },
    level2FocusBubble: '0.1 Generate-monthly-bill',
    level2SubBubbles: [
      { id: '0.1.1', name: 'Calculate-consumption', description: 'Subtracts previous meter reading from current reading.', inputs: ['current-reading', 'previous-reading'], outputs: ['units-consumed'] },
      { id: '0.1.2', name: 'Compute-slab-tariff', description: 'Calculates tiered utility cost based on consumption bands.', inputs: ['units-consumed', 'Tariff-slabs'], outputs: ['current-energy-charge'] },
      { id: '0.1.3', name: 'Apply-arrears-and-print', description: 'Adds carryover balance and surcharges; prints formatted bill.', inputs: ['current-energy-charge', 'Connection-accounts'], outputs: ['utility-bill', 'account-balance-update'] }
    ]
  },
  {
    id: 'dfd-prob-9',
    problemNumber: 9,
    title: 'Problem 9: Online Bookstore Order System',
    systemName: 'Online Bookstore Order System',
    requirement: `Customer browses catalogue, adds books to cart; at checkout, system verifies books in stock; rejects unavailable items with expected restock date.
Customer supplies delivery address and payment method; system calculates order total with shipping, processes payment, confirms order, prints packing slip for warehouse.
Warehouse picks/packs books, updates inventory, hands package to delivery partner who provides tracking number emailed to customer.
If book is damaged/missing during picking, warehouse flags order as partially fulfilled, and system automatically issues partial refund.
Store manager requests report of best-selling titles over date range, and report of orders awaiting fulfillment.`,
    externalEntities: [
      { name: 'Customer', inputs: ['cart-checkout', 'payment-details'], outputs: ['order-confirmation', 'tracking-email', 'partial-refund-notice'] },
      { name: 'Warehouse', inputs: ['item-damage-flag', 'courier-tracking-id'], outputs: ['packing-slip'] },
      { name: 'Delivery Partner', inputs: ['package-handover'], outputs: ['tracking-id'] },
      { name: 'Store Manager', inputs: ['manager-report-query'], outputs: ['best-sellers-report', 'pending-fulfillment-backlog'] }
    ],
    candidateFunctions: [
      { id: '0.1', name: 'Verify-cart-and-checkout', triggeredBy: 'Customer initiates checkout', description: 'Checks stock; calculates shipping; collects payment; creates packing slip.' },
      { id: '0.2', name: 'Fulfill-and-dispatch', triggeredBy: 'Warehouse confirms pack', description: 'Decrements inventory, records tracking number, notifies customer.' },
      { id: '0.3', name: 'Handle-order-exceptions', triggeredBy: 'Warehouse reports damaged item', description: 'Updates order status to partially fulfilled; issues automated refund.' },
      { id: '0.4', name: 'Generate-store-reports', triggeredBy: 'Store manager request', description: 'Compiles best-sellers rankings and unfulfilled order queue.' }
    ],
    dataStores: ['Book-catalog', 'Inventory-stock', 'Customer-orders', 'Fulfillment-log', 'Refunds-ledger'],
    level0: {
      systemBubble: 'Bookstore Order System (0)',
      flows: [
        { from: 'Customer', to: '0', label: 'cart-items + payment' },
        { from: '0', to: 'Customer', label: 'order-confirmation / tracking' },
        { from: '0', to: 'Warehouse', label: 'packing-slip' },
        { from: 'Warehouse', to: '0', label: 'tracking-id / damaged-item-flag' },
        { from: 'Store Manager', to: '0', label: 'report-query' },
        { from: '0', to: 'Store Manager', label: 'sales-reports' }
      ]
    },
    level1: {
      bubbles: [
        { id: '0.1', name: 'Verify-cart-and-checkout', readsFrom: ['Book-catalog', 'Inventory-stock'], writesTo: ['Customer-orders'], inputs: ['cart + payment'], outputs: ['order-confirm', 'packing-slip (Warehouse)'] },
        { id: '0.2', name: 'Fulfill-and-dispatch', readsFrom: ['Customer-orders'], writesTo: ['Inventory-stock', 'Fulfillment-log'], inputs: ['courier-tracking-id'], outputs: ['tracking-email (Customer)'] },
        { id: '0.3', name: 'Handle-order-exceptions', readsFrom: ['Customer-orders'], writesTo: ['Customer-orders', 'Refunds-ledger'], inputs: ['damaged-item-flag'], outputs: ['refund-notice (Customer)'] },
        { id: '0.4', name: 'Generate-store-reports', readsFrom: ['Fulfillment-log', 'Customer-orders'], writesTo: [], inputs: ['report-query'], outputs: ['best-sellers-list', 'pending-orders-list'] }
      ]
    },
    level2FocusBubble: '0.1 Verify-cart-and-checkout',
    level2SubBubbles: [
      { id: '0.1.1', name: 'Check-stock-availability', description: 'Validates requested book quantities against stock levels.', inputs: ['cart-items', 'Inventory-stock'], outputs: ['in-stock-items', 'restock-notice'] },
      { id: '0.1.2', name: 'Calculate-total-and-shipping', description: 'Computes book subtotal, delivery charges, and taxes.', inputs: ['in-stock-items', 'shipping-address'], outputs: ['final-order-total'] },
      { id: '0.1.3', name: 'Authorize-payment-and-release', description: 'Charges customer payment method and generates packing slip.', inputs: ['payment-credentials', 'final-order-total'], outputs: ['Customer-orders write', 'order-confirmation', 'packing-slip'] }
    ]
  },
  {
    id: 'dfd-prob-10',
    problemNumber: 10,
    title: 'Problem 10: Fitness Club Membership System',
    systemName: 'Fitness Club Membership System',
    requirement: `Prospective member signs up choosing membership plan; staff records personal details, collects payment, activates membership, prints membership card. Existing members renew or upgrade plans with fee difference calculated automatically.
Club runs group classes with maximum participants. Member books spot at desk or kiosk; system checks capacity and plan eligibility, reserves spot and prints confirmation.
If member cancels, freed spot offered to first person on waiting list.
Each entry scans member card at gate, verifying active membership before allowing entry and logging visit.
Club manager requests report of attendance trends by month, and list of memberships expiring within 2 weeks.`,
    externalEntities: [
      { name: 'Member', inputs: ['signup-details', 'plan-upgrade-request', 'class-booking', 'card-scan-at-gate'], outputs: ['membership-card', 'booking-confirmation', 'gate-access-granted'] },
      { name: 'Club Staff', inputs: ['payment-collected', 'plan-selection'], outputs: ['membership-slip'] },
      { name: 'Club Manager', inputs: ['manager-analytics-query'], outputs: ['attendance-trends-report', 'expiring-memberships-list'] }
    ],
    candidateFunctions: [
      { id: '0.1', name: 'Manage-memberships', triggeredBy: 'New member signs up or renews', description: 'Records details, processes dues, calculates plan upgrades, issues card.' },
      { id: '0.2', name: 'Book-group-classes', triggeredBy: 'Member reserves class spot', description: 'Checks plan eligibility and capacity; enqueues waiting list or books spot.' },
      { id: '0.3', name: 'Process-gate-access', triggeredBy: 'Member scans barcode at turnstile', description: 'Verifies active membership; unlocks gate and logs attendance timestamp.' },
      { id: '0.4', name: 'Generate-management-reports', triggeredBy: 'Club manager request', description: 'Compiles monthly attendance charts and impending expiry list.' }
    ],
    dataStores: ['Member-roster', 'Class-schedules', 'Attendance-logs', 'Plan-catalog', 'Waiting-lists'],
    level0: {
      systemBubble: 'Fitness Club Management (0)',
      flows: [
        { from: 'Member', to: '0', label: 'membership-requests / gate-scan' },
        { from: '0', to: 'Member', label: 'card / confirmation / gate-unlock' },
        { from: 'Club Staff', to: '0', label: 'payment-entries' },
        { from: 'Club Manager', to: '0', label: 'analytics-query' },
        { from: '0', to: 'Club Manager', label: 'attendance-reports' }
      ]
    },
    level1: {
      bubbles: [
        { id: '0.1', name: 'Manage-memberships', readsFrom: ['Plan-catalog'], writesTo: ['Member-roster'], inputs: ['member-data + payment'], outputs: ['membership-card'] },
        { id: '0.2', name: 'Book-group-classes', readsFrom: ['Member-roster', 'Class-schedules'], writesTo: ['Class-schedules', 'Waiting-lists'], inputs: ['booking-request'], outputs: ['booking-confirmation'] },
        { id: '0.3', name: 'Process-gate-access', readsFrom: ['Member-roster'], writesTo: ['Attendance-logs'], inputs: ['card-scan'], outputs: ['gate-unlock-signal'] },
        { id: '0.4', name: 'Generate-management-reports', readsFrom: ['Attendance-logs', 'Member-roster'], writesTo: [], inputs: ['analytics-query'], outputs: ['monthly-trends', 'expiry-list'] }
      ]
    },
    level2FocusBubble: '0.2 Book-group-classes',
    level2SubBubbles: [
      { id: '0.2.1', name: 'Verify-plan-eligibility', description: 'Confirms member plan covers group fitness sessions.', inputs: ['member-id', 'Member-roster'], outputs: ['eligibility-confirmed', 'ineligible-notice'] },
      { id: '0.2.2', name: 'Check-class-capacity', description: 'Evaluates current roster count against maximum participant limit.', inputs: ['class-id', 'Class-schedules'], outputs: ['seat-open', 'seat-full'] },
      { id: '0.2.3', name: 'Confirm-reservation-or-waitlist', description: 'Books confirmed slot or enqueues member on first-come waiting list.', inputs: ['seat-open', 'seat-full'], outputs: ['Class-schedules write', 'Waiting-lists write', 'booking-confirmation'] }
    ]
  }
];
