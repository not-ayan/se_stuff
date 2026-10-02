# DFD Practice Studio: 10 Solved Exam Problems & Trading House (TAS)
*Complete Structured Analysis Solutions according to Dr. Rajib Mall / Tezpur & IIT Kharagpur Standards*

---

## Worked Master Problem: Trading-House Automation System (TAS)

### 1. Requirements Extraction
- **External Entities**: Customer, Purchase Department, Manager.
- **Level 1 Functions**:
  - `0.1 Accept-order`: Authenticate customer, check credit-worthiness using past bills history, accept or generate reject message.
  - `0.2 Process-order`: Validate items with item master, check inventory, generate bill & material issue slip, log shortage into pending orders.
  - `0.3 Handle-query`: Answer manager sales query over given time period from sales statistics.
  - `0.4 Handle-indent-request`: On purchase dept command, tally pending orders, find vendor address, and print vendor indents.
- **Data Stores**: Customer-file, Customer-history, Item-file, Inventory, Accepted-orders, Pending-order, Vendor-list, Sales-statistics.

### 2. Level 0 Context Diagram
- **Single Process**: `Trading-House Automation System (0)`
- **External Entities**:
  - `Customer` $\rightarrow$ sends `order` $\rightarrow$ receives `response` (`bill + material-issue-slip` OR `reject-message`).
  - `Purchase Department` $\rightarrow$ sends `generate-indent` $\rightarrow$ receives `indents`.
  - `Manager` $\rightarrow$ sends `query` $\rightarrow$ receives `statistics`.

### 3. Level 1 DFD Bubbles
- `0.1 Accept-order`: Reads `Customer-file`, `Customer-history`; Outputs `reject-message` to Customer or `accepted-order` to `0.2`.
- `0.2 Process-order`: Reads `Item-file`, `Inventory`; Writes `Accepted-orders`, `Pending-order`, `Sales-statistics`; Outputs `bill + issue slip` to Customer.
- `0.3 Handle-query`: Reads `Sales-statistics`; Outputs `statistics` to Manager.
- `0.4 Handle-indent-request`: Reads `Pending-order`, `Vendor-list`; Outputs `indents` to Purchase Department.

### 4. Level 2 DFD for `0.2 Process-order`
- `0.2.1 Validate-items`: Takes `accepted-order`, checks against `Item-file`, emits `valid-items` (or `reject-message`).
- `0.2.2 Check-availability`: Checks `Inventory`, divides items into `available-items` and `short-items`. Decrements inventory for available stock.
- `0.2.3 Generate-documents`: Creates `bill + issue slip` for available items and sends to Customer.
- `0.2.4 Update-records`: Writes `sold-items` to `Accepted-orders` and `short-items` to `Pending-order`.

---

## 10 Independent DFD Practice Problems (Full Solved Guide)

### Problem 1: Community Library Automation System
- **Entities**: Member, Clerk, Librarian.
- **Data Stores**: Member-file, Book-catalogue, Loan-records, Fines-ledger.
- **Level 1 Bubbles**:
  - `0.1 Issue-book`: Check borrowing limit and unpaid fines. Stamp due date (14 days), update `Loan-records`.
  - `0.2 Return-book`: Check due date vs today's date. If overdue, calculate fine, update `Fines-ledger`, print receipt, mark book available.
  - `0.3 Search-catalogue`: Search catalogue by title or author, report availability to Clerk.
  - `0.4 Generate-overdue-report`: Compile weekly overdue books list for Librarian.

### Problem 2: Outpatient Appointment System for a Clinic
- **Entities**: Patient, Receptionist, Doctor, Clinic Administrator.
- **Data Stores**: Doctor-schedule, Patient-history, Appointment-file, Specialty-billing-ledger.
- **Level 1 Bubbles**:
  - `0.1 Book-appointment`: Check doctor schedule, reserve slot or add to waiting list, print confirmation slip.
  - `0.2 Check-in-patient`: Mark arrival, fetch patient history for doctor consultation.
  - `0.3 Record-consultation`: Record diagnosis and prescriptions, print visit summary for patient.
  - `0.4 Generate-admin-reports`: Output daily appointment list per doctor and monthly specialty consultation count.

### Problem 3: Hotel Room Reservation System
- **Entities**: Guest, Front-desk Clerk, Hotel Manager, Housekeeping.
- **Data Stores**: Room-inventory, Reservation-records, Guest-folios, Occupancy-log.
- **Level 1 Bubbles**:
  - `0.1 Reserve-room`: Verify room availability across dates, issue booking confirmation.
  - `0.2 Check-in-guest`: Assign room number, issue room key and registration card, activate folio.
  - `0.3 Post-services-and-checkout`: Post room service/laundry charges to bill, collect payment, print final invoice, flag room for housekeeping.
  - `0.4 Generate-occupancy-report`: Calculate occupancy rates across room types for Manager.

### Problem 4: Courier Parcel Tracking System
- **Entities**: Sender, Receiver, Booking Clerk, Transit Hub Scanner, Delivery Agent, Operations Manager.
- **Data Stores**: Rate-table, Parcel-tracking-ledger, Delivery-manifest, Proof-of-delivery-store.
- **Level 1 Bubbles**:
  - `0.1 Book-parcel`: Calculate rate based on weight, distance, speed; print barcoded shipping label.
  - `0.2 Scan-and-route-hub`: Scan tracking number at network hub, log timestamp and geo-location.
  - `0.3 Deliver-parcel`: Record delivery attempt (up to 3 times) or successful receiver signature (proof-of-delivery).
  - `0.4 Track-status-and-overdue`: Handle customer tracking queries and generate overdue parcel report for Operations Manager.

### Problem 5: University Course Registration System
- **Entities**: Student, Faculty Member, Finance Office, Academic Office.
- **Data Stores**: Student-record, Course-catalog, Timetable-schedule, Registration-ledger.
- **Level 1 Bubbles**:
  - `0.1 Validate-course-selection`: Verify prerequisites and seat quotas, check timetable conflicts.
  - `0.2 Finalize-registration`: Decrement course seat count, generate registration slip, notify Finance Office for billing.
  - `0.3 Generate-class-list`: Provide enrolled student roster to course faculty.
  - `0.4 Generate-enrollment-statistics`: Output department-wide enrollment statistics for Academic Office semester planning.

### Problem 6: Restaurant Table & Order Management System
- **Entities**: Customer, Host, Waiter, Kitchen Station Displays (Starters/Mains/Desserts), Manager.
- **Data Stores**: Table-layout, Menu-master, Active-orders, Sales-ledger.
- **Level 1 Bubbles**:
  - `0.1 Assign-table`: Check table availability by party size, mark table occupied.
  - `0.2 Take-order`: Verify item availability on daily menu, route tickets to kitchen displays.
  - `0.3 Track-preparation`: Kitchen stations notify waiter when courses are ready to serve.
  - `0.4 Bill-and-settle`: Compute total, apply discount, print itemized bill, mark table free upon payment.
  - `0.5 Generate-sales-report`: Daily sales report broken down by menu category for Manager.

### Problem 7: Car Rental Booking System
- **Entities**: Customer, Booking Clerk, Return Receiving Clerk, Fleet Manager.
- **Data Stores**: Fleet-inventory, Booking-records, Rental-rate-card, Repositioning-queue.
- **Level 1 Bubbles**:
  - `0.1 Reserve-vehicle`: Check fleet availability for category/dates, issue booking reference and rate estimate.
  - `0.2 Dispatch-vehicle`: Record start odometer reading and fuel level, activate agreement.
  - `0.3 Receive-return`: Record return odometer/fuel, calculate excess mileage and fuel shortfall fees, print final invoice, flag inter-branch repositioning.
  - `0.4 Generate-fleet-status-report`: Compile location and status (available, rented, maintenance) for Fleet Manager.

### Problem 8: Utility Bill Payment System
- **Entities**: Customer, Meter Reader, Counter Cashier, Online Gateway, Revenue Office.
- **Data Stores**: Connection-accounts, Tariff-rates, Payment-ledger, Disconnection-watchlist.
- **Level 1 Bubbles**:
  - `0.1 Generate-monthly-bill`: Compute consumption from meter reading, apply slab-wise tariff, add arrears, print/mail bill.
  - `0.2 Process-payment`: Accept counter or online payment, update balance, issue receipt.
  - `0.3 Flag-overdue-accounts`: Apply late surcharge after due date; flag 2-month consecutive defaulters for disconnection notice.
  - `0.4 Generate-revenue-summary`: Output total billed vs collected units/funds for Revenue Office.

### Problem 9: Online Bookstore Order System
- **Entities**: Customer, Warehouse Picker, Delivery Partner, Store Manager.
- **Data Stores**: Book-catalog, Inventory-stock, Order-ledger, Tracking-store.
- **Level 1 Bubbles**:
  - `0.1 Checkout-and-pay`: Verify stock availability, calculate total + shipping, process payment, generate warehouse packing slip.
  - `0.2 Dispatch-and-track`: Pick/pack items, decrement stock, receive courier tracking number, email customer.
  - `0.3 Process-exceptions`: Handle damaged/out-of-stock items, issue automatic partial refunds.
  - `0.4 Generate-inventory-reports`: Output best-selling titles and pending fulfillment backlog for Store Manager.

### Problem 10: Fitness Club Membership System
- **Entities**: Member, Front-desk Staff, Kiosk Scanner, Club Manager.
- **Data Stores**: Member-profiles, Plan-matrix, Class-schedules, Attendance-logs.
- **Level 1 Bubbles**:
  - `0.1 Manage-membership`: New signups, renewals, plan upgrades with automated fee difference calculation.
  - `0.2 Book-class`: Validate class capacity and member plan eligibility; manage waiting list promotions upon cancellation.
  - `0.3 Scan-gate-entry`: Turnstile barcode scan verifies active membership and logs visit timestamp.
  - `0.4 Generate-club-metrics`: Output monthly attendance trends and 14-day upcoming membership expiry list for Manager.
