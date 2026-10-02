# Module 6: DFD Practice Studio — Master Tutorial & 10 Solved Exam Problems
*Authors & References: Dr. Rajib Mall (IIT Kharagpur) & University Exam Solutions*

---

## 1. Step-by-Step Methodology to Construct a DFD from Problem Statements

1. **Step 1: Identify System Boundaries & External Entities**
   - Read the specification and underline all nouns that represent actors, external departments, or external systems outside the software boundary.
2. **Step 2: Draw the Level 0 Context Diagram**
   - Draw Bubble 0 in the center with the complete system name.
   - Place External Entities around Bubble 0. Connect major input data flows from sources to Bubble 0, and output flows from Bubble 0 to sinks. **No data stores!**
3. **Step 3: Extract Candidate Functions (Processes)**
   - Underline all action verbs (e.g. `accept order`, `validate item`, `generate invoice`). Group related verbs into 3 to 7 primary Level 1 candidate bubbles.
4. **Step 4: Identify Data Stores**
   - Identify nouns representing persistent business files, records, or databases (e.g. `Customer-File`, `Inventory-DB`).
5. **Step 5: Construct the Level 1 DFD**
   - Draw the 3 to 7 candidate bubbles, place data stores, and connect internal data flow arrows.
6. **Step 6: Decompose Complex Bubbles into Level 2**
   - For any bubble with multi-step sub-logic, construct a child Level 2 diagram with sub-bubbles (e.g. `2.1`, `2.2`, `2.3`).
7. **Step 7: Verify Flow Balancing & Author Data Dictionary**
   - Verify that all inputs/outputs at Level 0 match Level 1, and Level 1 matches Level 2. Write formal data definitions.

---

## 2. Master Case Tutorial: Trading House Automation System (TAS / RMS)

### 2.1 Problem Specification
A trading house manages raw materials. Customers submit orders. The system validates customer credit and order details. If valid, an invoice is generated, inventory is updated, and a delivery challan is sent to the warehouse. When stock falls below reorder levels, the system automatically creates vendor purchase indents. Customers can also query order status.

### 2.2 Entity & Bubble Breakdown
* **External Entities**: `Customer`, `Warehouse`, `Vendor`, `Manager`.
* **Level 1 Candidate Bubbles**:
  - `0.1 Accept-Order`: Validates incoming customer order against `Customer-File`.
  - `0.2 Process-Order`: Checks `Inventory`, generates `Invoice`, creates `Delivery-Challan`, updates `Inventory`.
  - `0.3 Handle-Query`: Reads `Order-Status-Store` and responds to customer status inquiries.
  - `0.4 Handle-Indent-Request`: Checks low stock levels and generates `Vendor-Purchase-Indent`.
* **Data Stores**: `Customer-File`, `Inventory`, `Accepted-Orders`, `Pending-Orders`, `Vendor-List`.

### 2.3 Context Diagram (Level 0)
```
                    [ Customer ]
                      │      ▲
          Order-Form  │      │  Invoice / Query-Response
                      ▼      │
            ┌──────────────────────────┐
            │                          │ ──── Delivery-Challan ────> [ Warehouse ]
            │   0. Trading House       │
            │      Automation System   │ ──── Purchase-Indent ────> [ Vendor ]
            │                          │
            └──────────────────────────┘
                      ▲
                      │ Management-Query / Reports
                      ▼
                  [ Manager ]
```

### 2.4 Level 1 DFD Diagram
```
[ Customer ] ─── Order-Form ───> (( 0.1 Accept-Order )) ─── Validated-Order ───> ═ Accepted-Orders ═
                                          │                                            │
                                    ═ Customer-File ═                                  ▼
                                                                             (( 0.2 Process-Order )) ──> [ Warehouse ]
                                                                                   │        │
                                                                                   │        └─ Invoice ─> [ Customer ]
                                                                                   ▼
                                                                             ═ Inventory ═
                                                                                   │
                                                                                   ▼
                                                                       (( 0.4 Handle-Indent )) ──> [ Vendor ]
```

---

## 3. 10 Solved University Exam Practice Problems

### Problem 1: Library Management System (LMS)
* **Entities**: `Student/Faculty`, `Librarian`.
* **Level 1 Bubbles**: `1.0 Issue-Book`, `2.0 Return-Book`, `3.0 Search-Catalogue`, `4.0 Calculate-Fine`, `5.0 Manage-Inventory`.
* **Data Stores**: `Book-Catalogue`, `Member-Record`, `Transaction-Log`.

### Problem 2: Supermarket Point of Sale (POS) & Billing System
* **Entities**: `Cashier`, `Customer`, `Store-Manager`.
* **Level 1 Bubbles**: `1.0 Scan-Barcode`, `2.0 Lookup-Item-Price`, `3.0 Compute-Total-Bill`, `4.0 Process-Payment`, `5.0 Update-Stock`.
* **Data Stores**: `Item-Price-DB`, `Inventory`, `Daily-Sales-Log`.

### Problem 3: Hospital Management System (HMS)
* **Entities**: `Patient`, `Doctor`, `Pharmacist`, `Billing-Desk`.
* **Level 1 Bubbles**: `1.0 Register-Patient`, `2.0 Schedule-Appointment`, `3.0 Record-Prescription`, `4.0 Dispense-Medicine`, `5.0 Generate-Final-Bill`.
* **Data Stores**: `Patient-Records`, `Doctor-Schedules`, `Pharmacy-Inventory`, `Billing-Ledger`.

### Problem 4: Employee Payroll Processing System
* **Entities**: `Employee`, `HR-Department`, `Bank`.
* **Level 1 Bubbles**: `1.0 Record-Attendance`, `2.0 Compute-Gross-Salary`, `3.0 Calculate-Tax-Deductions`, `4.0 Generate-Payslip`, `5.0 Transfer-Salary-Bank`.
* **Data Stores**: `Employee-Master`, `Attendance-Log`, `Tax-Rules-DB`, `Payroll-History`.

### Problem 5: Automated Teller Machine (ATM) Banking System
* **Entities**: `Bank-Customer`, `Core-Banking-Server`, `Cash-Dispenser`.
* **Level 1 Bubbles**: `1.0 Validate-PIN-Card`, `2.0 Verify-Balance`, `3.0 Dispense-Cash`, `4.0 Update-Account-Ledger`, `5.0 Print-Receipt`.
* **Data Stores**: `ATM-Cash-Vault`, `Local-Audit-Log`.

### Problem 6: University Student Admission & Registration System
* **Entities**: `Applicant`, `Admission-Committee`, `Registrar`.
* **Level 1 Bubbles**: `1.0 Submit-Application`, `2.0 Verify-Eligibility-Merit`, `3.0 Allocate-Department-Seat`, `4.0 Collect-Tuition-Fee`, `5.0 Generate-Roll-Number`.
* **Data Stores**: `Applicant-DB`, `Seat-Matrix`, `Fee-Ledger`, `Student-Master`.

### Problem 7: Airline Flight Seat Reservation System
* **Entities**: `Passenger`, `Travel-Agent`, `Flight-Operations`.
* **Level 1 Bubbles**: `1.0 Query-Flight-Schedule`, `2.0 Check-Seat-Availability`, `3.0 Book-Ticket-Payment`, `4.0 Cancel-Booking-Refund`, `5.0 Generate-Boarding-Pass`.
* **Data Stores**: `Flight-Schedule-DB`, `Seat-Inventory`, `Passenger-Manifest`, `Ticket-Ledger`.

### Problem 8: Multi-Floor Automated Elevator Controller
* **Entities**: `Floor-Passenger`, `Cabin-Passenger`, `Motor-Hardware`, `Door-Sensor`.
* **Level 1 Bubbles**: `1.0 Read-Hall-Calls`, `2.0 Read-Cabin-Destination`, `3.0 Compute-Optimal-Dispatch-Direction`, `4.0 Control-Motor-Speed`, `5.0 Operate-Door-Safety`.
* **Data Stores**: `Floor-Request-Queue`, `Elevator-State-Store`.

### Problem 9: Automated Weather Monitoring & Reporting System
* **Entities**: `Atmospheric-Sensors (Temp, Humidity, Pressure, Wind)`, `Meteorologist`, `Public-Web-Portal`.
* **Level 1 Bubbles**: `1.0 Collect-Raw-Sensor-Data`, `2.0 Calibrate-Filter-Readings`, `3.0 Compute-Statistical-Trends`, `4.0 Detect-Extreme-Storm-Alerts`, `5.0 Publish-Weather-Bulletin`.
* **Data Stores**: `Raw-Sensor-Logs`, `Historical-Climatic-DB`, `Alert-Rules`.

### Problem 10: Warehouse Inventory & Order Dispatch System
* **Entities**: `Suppliers`, `E-Commerce-Platform`, `Delivery-Courier`.
* **Level 1 Bubbles**: `1.0 Inward-Goods-Receipt`, `2.0 Bin-Location-Allocation`, `3.0 Pick-And-Pack-Order`, `4.0 Generate-Shipping-Manifest`, `5.0 Reorder-Low-Stock`.
* **Data Stores**: `Warehouse-Bin-Map`, `Item-Inventory`, `Packing-Slip-Queue`, `Supplier-Directory`.

---

## 4. Exam Tips for DFD Questions (10-15 Marks)

> [!TIP]
> **Checklist for Full Marks in DFD Exam Questions:**
> 1. Always start by drawing the **Level 0 Context Diagram** first with single Bubble 0 and NO data stores.
> 2. Ensure every process bubble has an active **verb-noun** name (e.g. `Calculate-Salary`, never just `Salary`).
> 3. Verify the **Balancing Rule**: Every arrow going in/out of Level 0 must be accounted for in Level 1.
> 4. Ensure no direct Entity $ightarrow$ Entity or Store $ightarrow$ Store arrows exist.
> 5. Include a short **Data Dictionary** at the end for major composite data packets.
