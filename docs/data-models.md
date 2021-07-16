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

## Backing Choice
```typescript
interface BackingChoice {
  id: string;
  manufacturer: string;
  pattern: string;
  colorNumber: string;
  colorName: string;
  price: number; // price per yard
  wideBolt: boolean;
  imgUrl: string;
}
```

## Batting Choice
```typescript
interface BattingChoice {
  id: string;
  manufacturer: string;
  composition: string; // '100% Cotton' | '80/20 Cotton / poly blend'
  loft: string // 'low' | 'medium' | 'high'|
  price: number // price per yard
  imgUrl: string;
}
```

## Binding Choice
```typescript
interface BindingChoice {
  id: string;
  manufacturer: string;
  pattern: string;
  colorNumber: string;
  price: number; // price per linear inch
  imgUrl: string;
}
```

## Customer
```typescript
interface Customer {
  id: string;
  name: string; // full name
  billingAddress: Address;
  shippingAddress: Address;
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
  battingChoice: BattingChoice | null;
  battingYards: number | null; // yards
  backingChoice: BackingChoice | null;
  backingYards: number | null; // yards
  bindingChoice: BindingChoice | null;
  bindingInches: number | null; // linear inches
  stitchChoice: StitchChoice;
  threadChoice: ThreadChoice;
  comments: string | null;
  total: number; // total price for this job
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

## Stitch Choice
```typescript
interface StitchChoice {
  id: string;
  vendor: string;
  sku?: string;
  patternName: string;
  imgUrl: string;
}
```

## Thread Choice
```typescript
interface ThreadChoice {
  id: string;
  manufacturer: string;
  sku?: string;
  colorNumber: string;
  colorName: string;
  imgUrl: string;
}
```