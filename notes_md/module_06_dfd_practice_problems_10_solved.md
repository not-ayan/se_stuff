# Module 6: DFD Practice Masterclass — 10 Solved Exam Problems

---

# Part VII — DFD Practice Set: How to Analyze All Ten Problems

## 80. A repeatable DFD algorithm for examinations

For each requirements paragraph, do not start drawing immediately. Use this sequence:

### Step A — Mark the outsiders
Underline people, offices, departments, or other systems that directly exchange data with the software. These are candidate external entities.

### Step B — Extract the verbs
Write down every system responsibility: book, check, calculate, reserve, record, generate, report, notify, etc. Group related verbs into 3–7 major functions.

### Step C — Extract persistent nouns
Anything that must be remembered between separate interactions becomes a candidate data store: customer record, inventory, appointment list, loan history, course list, etc.

### Step D — Extract outputs
Bills, slips, confirmations, receipts, reports, notices, lists, messages, and tracking histories are output data flows.

### Step E — Draw the context diagram first
Place the complete system in one bubble and connect only the external entities. Do not place internal data stores here.

### Step F — Make level 1
Break the system into 3–7 major functions. Connect each function to the appropriate stores and external entities.

### Step G — Choose one genuinely complex function for level 2
Choose a bubble that contains several transformations or meaningful internal subdivisions. Do not decompose a trivial one just to create another diagram.

### Step H — Check balancing
Everything entering or leaving a parent process must be explainable in its child decomposition. Even when the source practice sheet does not explicitly use the word “balancing,” this is a useful structured-analysis check derived from the hierarchy demonstrated by the Trading-House worked solution.

---

## 81. Problem 1 — Community Library Automation System

### Requirement focus
The library automates book issue and return, fines, catalogue search, and a weekly overdue list.

### External entities directly implied

- **Member** — provides membership identity when borrowing/returning and receives rejection/fine information and overdue correspondence.
- **Clerk** — performs the issue/return/search interactions with the system.
- **Librarian** — requests the weekly overdue list.

The source problem does not say that an external bank, payment gateway, or publisher interacts with the system, so those should not be invented.

### Candidate level-1 functions

1. **Issue Book** — verify member, borrowing limit, outstanding fines, create loan, assign due date, produce rejection message when blocked.
2. **Return Book** — compare due date with today, calculate fine if overdue, close loan, mark book available, print receipt.
3. **Search Catalogue** — search by title or author and report availability.
4. **Generate Overdue List** — find all overdue loans and create a member-addressed weekly list.

Four bubbles are a natural decomposition and match the 3–7 guideline.

### Candidate data stores

- Member-file
- Book/Catalogue-file
- Loan-records
- Fine/account records

These names are analytical labels; the requirement itself specifies what the library remembers, not a mandatory database schema.

### Important flows

```text
Member/Clerk → Issue Book → membership + book information
Issue Book ↔ Member/Loan/Fine data
Issue Book → confirmation OR rejection message

Clerk → Return Book → return information
Return Book → fine receipt (when applicable)
Return Book → loan closed + book available

Clerk → Search Catalogue → title/author → availability result

Librarian → Generate Overdue List → weekly overdue list
```

### Best level-2 candidate
`Issue Book` is a good choice because it contains several real decisions: member eligibility, borrowing limit, unpaid-fine check, issuing, and loan recording.

### Exam traps
Do not treat the **library catalogue** as an external entity; it is an internal data store. Do not draw the overdue case as a control-flow branch with “IF overdue” on a DFD. Put the required information transformation into the relevant process and use named data flows.

---

## 82. Problem 2 — Outpatient Appointment System for a Clinic

### Requirement focus
The system books appointments, handles arrival, provides patient history to the doctor, records consultation results, and produces operational/billing reports.

### External entities

- Patient
- Receptionist
- Doctor
- Clinic Administrator

### Candidate level-1 functions

1. **Book Appointment**
2. **Check In Patient / Retrieve History**
3. **Record Consultation**
4. **Generate Clinic Reports**

### Candidate stores

- Patient-file / history
- Doctor schedules / appointment records
- Consultation records
- Waiting list

### Important data flows

Booking sends doctor/specialty/date preferences and patient identity into the system and yields a confirmed slot, offered alternative, or waiting-list outcome.

Check-in sends an arrival event and retrieves the patient history for the doctor.

Consultation sends diagnosis and prescribed medicines and results in a recorded patient-file update plus a visit summary.

Reports include:

- daily appointments for each doctor,
- monthly consultation count by specialty.

### Level-2 candidate
`Book Appointment` contains multiple sub-activities: identify desired doctor/specialty, inspect schedule, reserve a slot, or generate an alternative/waiting-list outcome.

### Modeling caution
The requirement distinguishes “doctor” from “receptionist.” Even if both could theoretically be the same human in a tiny clinic, the DFD should respect the roles described in the requirement.

---

## 83. Problem 3 — Hotel Room Reservation System

### External entities

- Guest
- Front-desk clerk
- Hotel manager

### Major functions

1. **Reserve Room**
2. **Check In Guest**
3. **Manage Stay Charges**
4. **Check Out / Produce Invoice**
5. **Generate Occupancy Report**

Five level-1 bubbles fit the practice guideline.

### Candidate stores

- Room inventory/status
- Reservations
- Guest records
- Running bills / stay charges
- Housekeeping status

### Key transformations

Reservation uses requested dates and room type to determine availability over the **full requested period**. If no complete-period match exists, the system returns alternative dates or room type information.

Check-in changes reservation state, assigns a room number, and produces the registration card and room-key instruction.

During the stay, additional services such as room service and laundry are added to the running bill.

Checkout totals charges, accepts payment, prints final invoice, and marks the room as needing housekeeping before it can be booked again.

### Level-2 candidate
`Check Out / Produce Invoice` or `Reserve Room` both contain real complexity. Reservation is especially useful if the examiner wants a decomposition around availability over multiple requested dates.

### DFD-specific caution
“Nearest alternative dates” is a result of processing. Do not put “if no room then…” as a control arrow. The flow should be an **alternative availability result** produced by the reservation process.

---

## 84. Problem 4 — Courier Parcel Tracking System

### External entities

- Customer
- Booking clerk
- Pickup agent
- Hub / hub operator
- Delivery agent
- Operations manager

### Major functions

1. **Book Pickup / Create Tracking Record**
2. **Scan and Update Parcel Status**
3. **Answer Tracking Request**
4. **Manage Delivery Attempts**
5. **Store / Provide Proof of Delivery**
6. **Generate Overdue Parcel Report**

Six bubbles are within the recommended range.

### Candidate stores

- Parcel/tracking records
- Rate table
- Location/status history
- Delivery attempt history
- Proof-of-delivery records

### Critical flows

Booking receives addresses, weight, and speed and calculates shipping charge. A unique tracking number is associated with the parcel.

Each hub supplies scan information containing the tracking number, location, and timestamp.

A tracking request is answered with current status and location history.

At destination, failed delivery attempts are recorded; re-delivery is scheduled for the next day, up to three attempts. The requirement explicitly says the parcel is returned to the sender after three failed attempts.

After successful delivery, the receiver’s signature becomes part of the proof-of-delivery record, which is made available to the sender.

### Level-2 candidate
`Manage Delivery Attempts` is ideal because it contains repeated delivery outcomes and the eventual return-to-sender rule.

### Modeling caution
A DFD does not draw a loop saying “next day.” The re-delivery information itself is data. Timing and repetition remain part of the requirement semantics, but DFD arrows should remain data-oriented.

---

## 85. Problem 5 — University Course Registration System

### External entities

- Student
- Finance Office
- Faculty member
- Academic Office

The student and university staff interact with the registration system; the finance office receives finalized registration information.

### Major functions

1. **Authenticate / Start Registration**
2. **Validate Course Selection**
3. **Check Schedule Conflicts / Build Provisional Timetable**
4. **Finalize Registration**
5. **Produce Class / Enrollment Reports**

### Candidate stores

- Student academic record
- Course catalogue
- Prerequisite information
- Seat counts
- Timetable/schedule
- Registration records

### Core validation

For each chosen course, the system checks:

- prerequisite completion,
- seat availability.

Then it checks clashes among selected courses.

The important conceptual distinction is between **provisional** and **finalized** registration. Until confirmation, selections belong in an intermediate state. Once confirmed, seats are decremented, the registration slip is produced, and finance is notified.

### Outputs

- rejection messages explaining failed prerequisite/seat checks,
- registration slip,
- notification to finance,
- faculty class lists after registration closes,
- academic-office enrolment report.

### Level-2 candidate
`Validate Course Selection` can be decomposed into prerequisite check, seat availability check, and timetable-conflict processing.

---

## 86. Problem 6 — Restaurant Table and Order Management System

### External entities explicitly represented by operational roles

- Host
- Waiter
- Kitchen stations
- Restaurant manager

The requirement describes customers as participants in the business scenario, but customers are not explicitly stated to enter data directly into the software. For a strict DFD derived from the requirement, the direct external interfaces are better represented by the staff roles and kitchen stations that interact with the system.

### Major functions

1. **Assign Table**
2. **Enter / Validate Order**
3. **Send / Split Kitchen Tickets**
4. **Track Course Preparation**
5. **Generate Bill / Record Payment**
6. **Generate Sales Report**

### Candidate stores

- Table/seating chart
- Menu availability
- Current orders
- Bill/payment records
- Sales statistics

### Key transformation
The order is checked against the day’s menu. Unavailable items have to be communicated back to the waiter. Once confirmed, the order is split into starters, mains, and desserts tickets.

The kitchen stations send ready-status information, which causes the system to notify the waiter about the course. Again, the DFD should represent status information, not a control-flow arrow saying “when ready, notify waiter.”

### Checkout
The bill process totals the order, applies a discount when applicable, prints the itemized bill, records payment, and marks the table free.

### Level-2 candidate
`Send / Split Kitchen Tickets` is a good candidate because it contains order decomposition by course/station and later readiness information.

---

## 87. Problem 7 — Car Rental Booking System

### External entities

- Customer
- Booking clerk
- Pickup clerk
- Receiving clerk
- Fleet manager

### Major functions

1. **Create Booking**
2. **Activate Rental at Pickup**
3. **Process Return**
4. **Calculate Final Charges**
5. **Generate Fleet Status Report**

### Candidate stores

- Fleet records
- Reservations
- Customer/license records
- Rental contract/current rental status
- Branch/location information
- Maintenance status

### Important requirements to preserve
The car must be free for the **whole requested date range**. A booking reference and estimated charge are produced.

At pickup, odometer and fuel readings are recorded and the reservation becomes active.

At return, the receiving clerk records both readings again. Extra charges can arise from mileage beyond the included limit or fuel shortfall. A final invoice covers the base rental and extras.

A return to another branch causes the system to flag the car for eventual repositioning.

### Level-2 candidate
`Process Return` can be decomposed into reading capture, rental closure, mileage comparison, fuel comparison, extra-charge determination, final invoice preparation, and repositioning flag creation.

---

## 88. Problem 8 — Utility Bill Payment System

### External entities

- Meter reader
- Customer
- Collection counter
- Online payment gateway
- Revenue Office

The payment gateway is explicitly mentioned by the requirement, so unlike some other problems there is a clear external system boundary here.

### Major functions

1. **Record Meter Reading / Generate Bill**
2. **Record Payment**
3. **Manage Late / Unpaid Accounts**
4. **Generate Revenue Report**
5. **Generate Flagged-Accounts List**

### Candidate stores

- Connection/account records
- Previous/current meter readings
- Tariff table
- Bills and balances
- Payment records
- Account-status/disconnection flags

### Billing logic
The system calculates:

```text
current reading − previous reading
          ↓
units consumed
          ↓
slab-wise tariff calculation
          ↓
current amount
          +
unpaid carried-forward balance
          ↓
amount due
```

The bill contains units, amount due, and payment due date.

### Unpaid consequences
Late payment leads to a surcharge on the following month’s bill. Two consecutive unpaid bills cause the account to be flagged for disconnection and a notice to be sent.

### Level-2 candidate
`Manage Late / Unpaid Accounts` is the strongest candidate because it incorporates previous payment status, surcharge information, consecutive nonpayment, flagging, and notice generation.

---

## 89. Problem 9 — Online Bookstore Order System

### External entities

- Customer
- Warehouse
- Delivery partner
- Store manager

The requirement says the system “processes the payment,” but does not explicitly name a payment gateway as an interacting external entity. Under the source rule “nothing beyond the requirement should be invented,” do not automatically add a payment gateway.

### Major functions

1. **Browse Catalogue / Cart Management**
2. **Validate Stock at Checkout**
3. **Calculate Total and Process Payment**
4. **Pack and Update Fulfilment**
5. **Record Tracking / Notify Customer**
6. **Handle Partial Fulfilment / Refund**
7. **Generate Manager Reports**

Seven bubbles is right at the source guideline and captures the many explicitly named responsibilities.

### Candidate stores

- Catalogue
- Inventory
- Carts/orders
- Payment/order status
- Fulfilment records
- Tracking information
- Refund records

### Important branch information
Items not in stock are rejected from the remaining order selection, with an expected restock date shown where known.

Only after payment succeeds is the order confirmed and a packing slip printed.

If warehouse picking discovers a damaged or missing book, the order is partially fulfilled and a partial refund is issued.

### Level-2 candidate
`Handle Partial Fulfilment / Refund` or `Validate Stock at Checkout` both contain significant internal logic.

---

## 90. Problem 10 — Fitness Club Membership System

### External entities

- Prospective/existing member
- Front-desk staff
- Kiosk
- Gate/card scanner
- Club manager

### Major functions

1. **Create / Activate Membership**
2. **Renew / Upgrade Membership**
3. **Book / Cancel Class**
4. **Manage Waiting List**
5. **Validate Entry / Log Visit**
6. **Generate Membership and Attendance Reports**

### Candidate stores

- Member records
- Membership plans and validity
- Payments
- Classes and capacities
- Class bookings
- Waiting lists
- Visit/attendance records

### Membership logic
A joining payment activates a membership from the current date for the plan duration, and a membership card is printed.

Renewal extends validity by the plan duration. Upgrading calculates the fee difference automatically.

### Class logic
The system checks:

- whether the class is full,
- whether the member’s plan includes group classes.

On cancellation, the first waiting-list person is offered the released place when a waiting list exists.

### Entry logic
Each visit begins with a card scan. The system checks active membership before allowing entry and logs the visit.

### Reports
- monthly attendance trends,
- memberships expiring within the next two weeks.

### Level-2 candidate
`Book / Cancel Class` is an excellent choice because capacity, eligibility, booking, cancellation, and waiting-list promotion all relate to the same underlying responsibility.

---

---

# Deep Dive: Extended Step-by-Step DFD Reasoning for All 10 Problems

# Deep Dive L — Extended DFD Reasoning for the Ten Practice Problems

## 175. Problem 1 — Community Library: full analysis thinking

### Requirement responsibilities

The requirement contains four obvious service areas:

```text
Issue book
Return book
Search catalogue
Generate overdue list
```

### External roles

- Member
- Clerk
- Librarian

The clerk is an operational user of the system. The member is the person whose borrowing state is managed. The librarian requests the weekly overdue list.

### Persistent information

A careful extraction suggests at least:

- member data,
- catalogue/book data,
- loan data,
- outstanding fine information.

### Level 1 suggestion

```text
1. Issue Book
2. Return Book
3. Search Catalogue
4. Generate Overdue List
```

### `Issue Book` level 2

A useful decomposition is:

```text
Identify member
      ↓
Check borrowing limit
      ↓
Check unpaid fine status
      ↓
Issue/Reject
      ↓
Record loan + due date
```

The requirement says the due date is **fourteen days later**, which must be represented in the functional behavior.

### `Return Book` level 2

```text
Read loan record
      ↓
Compare due date with today's date
      ↓
Calculate fixed-rate daily fine if overdue
      ↓
Update outstanding balance
      ↓
Close loan
      ↓
Mark book available
      ↓
Print fine receipt when required
```

### Where this problem teaches a reusable pattern

It demonstrates the difference between:

- **current status data** — available/unavailable books;
- **historical transaction data** — loan record;
- **accounting data** — fines/balance.

That pattern appears again in many other DFD problems.

---

## 176. Problem 2 — Clinic appointments: where the complexity lives

The requirement looks like “booking,” but it actually contains several state transitions.

### Main functions

```text
1. Book appointment
2. Check in patient / retrieve history
3. Record consultation
4. Generate reports
```

### Important data

- doctor schedules,
- appointments,
- patient history,
- diagnosis/medication records,
- waiting list.

### Why `Book appointment` is complex

The receptionist can request:

- a particular doctor,
- any available doctor in a specialty,
- a preferred date.

The process may yield:

- reserved slot,
- next available slot offer,
- waiting-list entry.

The DFD should capture these as data outcomes rather than drawing procedural control arrows.

### Check-in complexity

Check-in changes the appointment status to arrived and retrieves patient history for the doctor. That means one user interaction updates one store while retrieving information for another role.

### Report requirements

Two distinct report types must be preserved:

- daily appointment lists by doctor;
- monthly consultation counts by specialty.

A common exam mistake is to include “appointments report” and forget the specialty-based monthly consultation count.

---

## 177. Problem 3 — Hotel reservation: the critical word is “full period”

The requirement says a room must be free **across the requested dates**.

That means the reservation function conceptually considers an interval, not just a single date.

### Main functions

```text
1. Reserve room
2. Check in
3. Manage stay charges
4. Check out and invoice
5. Occupancy report
```

### Level-2 candidate: Reserve room

```text
Receive dates + room type
        ↓
Check room availability for full period
        ↓
Available?
  ├── yes → reserve under guest
  │          ↓
  │      print confirmation
  └── no  → offer alternative dates
             or different room type
```

Again, the “yes/no” is **logic in the underlying requirement**, not an instruction to draw `YES` or `NO` control labels on DFD arrows. The DFD should express the resulting data information.

### Check-in and checkout

Check-in associates the reservation with a specific room and generates registration material.

Checkout has several outcomes:

- final bill total,
- payment accepted,
- final invoice,
- room status set to housekeeping.

The requirement explicitly prevents the room from being immediately treated as bookable again.

---

## 178. Problem 4 — Courier tracking: history is a first-class store

This problem is ideal for learning the difference between **current status** and **location history**.

A tracking response contains both:

- current parcel status/location,
- history of scanned locations/timestamps.

Therefore the persistent model needs historical tracking information, not merely one “current location” field.

### Major responsibilities

```text
Create shipment
Scan/update tracking
Answer tracking request
Manage delivery attempts
Store/provide proof of delivery
Generate overdue report
```

### Level-2 candidate: delivery attempts

The rule can be represented as a data-processing decomposition:

```text
Attempt information
      ↓
Record attempt
      ↓
Delivery outcome data
   ├── delivered → signature / POD
   └── unavailable → next-day redelivery data
                         ↓
                    attempt count
                         ↓
                return-to-sender record
```

The requirement's “up to three attempts” is a business rule. Keep it visible in the analysis even though a DFD itself should not be turned into a flowchart.

---

## 179. Problem 5 — Course registration: validation plus provisional state

This problem is a strong example of **preliminary state versus final state**.

The source requirement describes a provisional timetable followed by final confirmation.

### Main responsibilities

```text
Authenticate/start
Validate courses
Build provisional timetable
Finalize registration
Produce reports/notifications
```

### Validation conditions

Each course must pass:

- prerequisite check,
- seat-limit check.

Then the selected set must be checked for schedule clashes.

### Why a provisional timetable is important

The system is not required to immediately decrement seat counts upon every attempted selection. The requirement says seat counts are decremented once the student confirms and registration is finalized.

This is a subtle but important requirement detail.

### External output

Finance office receives finalized registration information so fees can be billed.

Faculty receive final class lists after registration closes.

Academic office receives enrollment statistics after registration closes.

### Common mistake

Putting the academic report in the student interaction path. The requirement makes it a separate administrative query/report activity.

---

## 180. Problem 6 — Restaurant order management: three station tickets

The requirement contains a useful data-transformation chain.

```text
Customer order
      ↓
Menu availability validation
      ↓
Confirmed order
      ↓
Split into:
  ├── starters ticket
  ├── mains ticket
  └── desserts ticket
```

### Major functions

1. seating/table assignment;
2. order capture and validation;
3. kitchen ticket generation;
4. preparation/status updates;
5. bill and payment;
6. sales reporting.

### Why this is a good level-2 candidate

`Process Order` can be decomposed into:

```text
Capture order
   ↓
Check menu availability
   ↓
Flag unavailable items
   ↓
Confirm order
   ↓
Split into station tickets
   ↓
Record ready status
   ↓
Notify waiter
```

### Persistent stores

At minimum, analysis points toward:

- table/seating status,
- menu availability,
- orders,
- kitchen ticket/status information,
- payment/sales records.

### Report requirement

The manager requests daily total sales broken down by menu category. Do not replace this with a generic “sales report”; preserve the category breakdown.

---

## 181. Problem 7 — Car rental: pickup and return capture two measurement states

The requirement records odometer and fuel at both pickup and return.

That means the rental process needs to retain enough information to compare the two states.

### Main functions

```text
1. Create booking
2. Activate rental at pickup
3. Process return
4. Calculate extra charges / final invoice
5. Fleet status report
```

### Important state transitions

```text
Available
   ↓ booking
Reserved
   ↓ pickup
Rented
   ↓ return
Available / maintenance-related status
```

The exact source states mentioned for the fleet report are:

- available,
- rented,
- under maintenance.

If the return branch is not the home branch, the system also flags the car for repositioning.

### Level-2 candidate

`Process Return`:

```text
Receive return readings
      ↓
Compare odometer with included mileage
      ↓
Calculate mileage extra if applicable
      ↓
Compare fuel with expected level
      ↓
Calculate fuel extra if applicable
      ↓
Finalize rental
      ↓
Print invoice
      ↓
Flag repositioning when needed
```

---

## 182. Problem 8 — Utility billing: monthly state carries forward

The utility problem illustrates how one month depends on previous stored data.

### Core calculation

```text
Current meter reading
       −
Previous meter reading
       =
Units consumed
       ↓
Slab-wise tariff
       ↓
Current charge
       +
Unpaid carried-forward balance
       =
Amount due
```

### Major functions

1. record meter reading/generate bill;
2. record payment;
3. manage late/unpaid accounts;
4. generate revenue report;
5. generate flagged-account list.

### Important late-payment logic

- unpaid by due date → surcharge added to following month's bill;
- two consecutive unpaid bills → account flagged for disconnection and notice sent.

### Level-2 candidate: unpaid-account processing

This requires reading payment history, determining whether the due date has passed, calculating surcharge information, checking the consecutive-unpaid rule, and producing the appropriate notice/flag data.

### Report details

The revenue office needs:

- total units billed for a billing month,
- total amount collected,
- a separate list of currently flagged accounts.

The word “separate” matters: the second report is not merely another column in the first one.

---

## 183. Problem 9 — Online bookstore: partial fulfilment creates a second outcome path

The requirement is richer than a simple “place order” system because warehouse picking can discover damaged or missing books after payment/confirmation.

### Major functions

```text
1. Browse catalogue / cart
2. Verify stock
3. Calculate total and process payment
4. Confirm order / packing slip
5. Warehouse fulfilment and inventory update
6. Tracking / customer notification
7. Handle partial fulfilment and refund
```

### Important boundary condition

At checkout, the system verifies requested quantities are currently in stock. Items unavailable are rejected and a known restock date is shown.

### Later warehouse problem

Even though the checkout stock check passed, a later picking process can discover a damaged or missing book. That creates a **partial-fulfilment state** and a partial refund.

This teaches an important requirements-analysis principle: a system may need to handle failures that occur **after an earlier validation succeeded**.

### Level-2 candidate

`Handle partial fulfilment` can include:

```text
Receive warehouse exception
        ↓
Identify missing/damaged item
        ↓
Update order fulfilment state
        ↓
Calculate refund amount
        ↓
Issue partial refund
        ↓
Update customer/order record
```

The exact implementation of payment processing is not expanded beyond the requirement; do not invent an external payment entity unless the requirement names one.

---

## 184. Problem 10 — Fitness club: membership state + class capacity + gate access

This problem contains three distinct domains inside one system:

1. membership lifecycle,
2. class booking,
3. facility entry.

### Major functions

```text
Create/activate membership
Renew/upgrade membership
Book/cancel class
Manage waiting list
Validate entry/log visit
Generate reports
```

### Membership rules

Joining payment activates membership from that date for the plan duration.

Renewal extends the validity by the plan duration.

Upgrade calculates the fee difference automatically.

### Class rules

The system checks:

- whether the class is full;
- whether the member's plan includes group classes.

Cancellation can cause the freed spot to be offered to the first waiting-list person.

### Gate rules

Card scan → active membership check → entry allowed or denied → visit logged.

### Reports

- monthly attendance trends;
- memberships expiring within the next two weeks.

### Level-2 candidate

`Book/cancel class` is especially useful because it combines capacity, eligibility, booking, cancellation, and waiting-list processing.

---
