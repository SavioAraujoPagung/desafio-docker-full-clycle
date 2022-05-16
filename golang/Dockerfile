FROM golang:1.18 as builder
WORKDIR /usr/src/app
COPY . .
RUN go build main.go
ENTRYPOINT [ "./main" ]

FROM scratch
COPY --from=builder /usr/src/app/main .
ENTRYPOINT ["./main"]