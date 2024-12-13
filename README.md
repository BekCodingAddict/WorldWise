# WorldWise - You travel the world.
 Worldwise Travel Tracking is a travel management platform that provides organizations and individuals with tools to track travel itineraries and ensure traveler safety.

- WorldWise keep track of your advantures.

- A World map that tracks your footsteps into every city you can think of. Never forget your wonderful experinces, and show your friends how you have wandered the world!


## Errors:
### 1.React Query States are Frist render undefined 

This is my custom hook.Here data is initially undefined.
```javascript
export function useCities2() {
  const {
    isLoading,
    data, ///data is initially undefined.
    error,
  } = useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
    refetchOnMount: true,
  });
  console.log(data);

  return { isLoading, error, data };
}
```
So if want to use like
```javascript
  const { data } = useCities2(); // Frist render data undefined so error is occoured 
  const { cities } = data; //
```
>[!TIP]
>Solution:
```javascript
const {
    isLoading,
    data = {},
    error,
  } = useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
    refetchOnMount: true,
  });
```
