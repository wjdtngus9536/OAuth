import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // 엔티티 객체는 이 데코레이터를 붙여줘야 다른 곳에 의존성 주입을 할 수 있음
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({unique: true})
    email: string;
    @Column()
    password: string;
    @Column()
    username: string;
    
    @Column({ type: "datetime", default: ()=> "CURRENT_TIMESTAMP" }) // 데이터 베이스의 CURRENT_TIMESTAMP 함수를 이 열의 기본값으로 사용
    createdDt : Date; // = new Date(); // 데이터베이스가 기본 타임스탬프만 처리하도록 하려면 = new Date() 초기화는 생략 가능
}