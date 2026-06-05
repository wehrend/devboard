import { Plus } from "lucide-react"
import { Button } from "../../../components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card"

export default function BoardColumn({ title }: { title: string }) {
  return (
    <Card>
      <CardHeader className="rounded-lg border-b border-black bg-gray-50">
        <CardTitle className="justify-between font-bold">{title}</CardTitle>
        <CardAction>
          <Button>
            <Plus />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>Inhalt </CardContent>

      {/* <CardFooter>Footer </CardFooter> */}
    </Card>
  )
}
