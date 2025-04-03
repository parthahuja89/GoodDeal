
import {Card, CardHeader, CardTitle, CardDescription, CardContent} from '../ui/card'
import SevImage from '../../assets/sev.jpg'

let cardStyle = {
  backgroundImage: `url(${SevImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
}

export default function MovieCard() {
  return (
    <div>
      <Card className='w-80 h-40 bg-neutral-900 text-white border-neutral-800' style={cardStyle}>
        <CardHeader className='select-none'>
          <CardTitle>Severance</CardTitle>
          <CardDescription>2023</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
