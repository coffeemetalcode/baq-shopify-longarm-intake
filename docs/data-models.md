# Data Models

## Address
```typescript
interface Address {
  id: string;
  address1: string;
  address2: string | null;
  suite: string | null;
  city: string;
  state: string;
  postal: string;
}
```

## Customer
```typescript
interface Customer {
  id: string;
  name: string; // full name
  addresses: Address[];
  billingAddress: Address;
  mailingAddress: Address;
  phone: string;
  email: string;
  createdDate: Date;
}
```

## Job
```typescript
interface Job {
  id: string
  length: number;
  width: number;
  area: number;
  batting: number | null;
  backing: number | null;
  binding: number | null;
  stitchPattern: Stitch;
  threadColor: Thread;
  comments: string | null;
}
```

## Order
```typescript
interface Order {
  id: string;
  customer: Customer;
  shippingAddress: Address;
  jobs: Job[];
  requestedDate: Date;
  total: number;
  status: string; // 'placed' | 'received' | 'ready' | 'shipped' | 'fullfilled'
  // shipping charges?
  createdDate: Date;
  receivedDate: Date | null;
  readyDate: Date | null;
  shippedDate: Date | null;
  fulfilledDate: Date | null;
}
```

## Stitches
```typescript
interface Stitch {
  id: string;
  vendor: string;
  sku: string;
  patternName: string;
  imgUrl: string;
}
```

## Threads
```typescript
interface Thread {
  id: string;
  manufacturer: string;
  sku: string;
  colorNumber: string;
  colorName: string;
  imgUrl: string;
}
```