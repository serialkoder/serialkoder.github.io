---
layout: flashdeck
title: "Behavioral Design Patterns in Java"
tags: [design-patterns, java]
intro: |
  15 flash‑cards covering the Gang‑of‑Four *behavioral* patterns.
  • **Easy (1‑5)** – fundamentals  
  • **Medium (6‑10)** – adds structure/indirection  
  • **Hard (11‑15)** – complete, multi‑class mini‑programs (often with undo, ASTs, etc.)  
  <small>All snippets compile on any recent JDK without external libraries.</small>
cards:
  # ---------- EASY ----------
  - q: "Strategy: pick a compression algorithm at runtime (ZIP vs RAR)."
    a: |
      ```java
      interface Compressor { void compress(String in, String out); }

      class ZipCompressor implements Compressor {
          public void compress(String in, String out) {
              System.out.println("ZIP " + in + " → " + out);
          }
      }

      class RarCompressor implements Compressor {
          public void compress(String in, String out) {
              System.out.println("RAR " + in + " → " + out);
          }
      }

      class CompressionContext {
          private Compressor strategy;
          public void setStrategy(Compressor s) { strategy = s; }
          public void createArchive(String in, String out) { strategy.compress(in, out); }
      }

      // --- demo ---
      public class StrategyDemo {
          public static void main(String[] a) {
              CompressionContext ctx = new CompressionContext();
              ctx.setStrategy(new ZipCompressor());
              ctx.createArchive("report.txt", "report.zip");
              ctx.setStrategy(new RarCompressor());
              ctx.createArchive("photo.jpg", "photo.rar");
          }
      }
      ```
  - q: "Observer: notify displays when the temperature changes."
    a: |
      ```java
      interface Observer { void update(float t); }
      interface Subject { void add(Observer o); void remove(Observer o); void notifyAllObs(); }

      class WeatherStation implements Subject {
          private final java.util.List<Observer> obs = new java.util.ArrayList<>();
          private float temp;
          public void setTemperature(float t) { temp = t; notifyAllObs(); }
          public void add(Observer o) { obs.add(o); }
          public void remove(Observer o) { obs.remove(o); }
          public void notifyAllObs() { obs.forEach(o -> o.update(temp)); }
      }

      class ConsoleDisplay implements Observer {
          private final String name;
          ConsoleDisplay(String n) { name = n; }
          public void update(float t) { System.out.println(name + " => " + t + "°C"); }
      }

      public class ObserverDemo {
          public static void main(String[] args) {
              WeatherStation ws = new WeatherStation();
              ws.add(new ConsoleDisplay("Inside"));
              ws.add(new ConsoleDisplay("Outside"));
              ws.setTemperature(23.5f);
          }
      }
      ```
  - q: "Command: decouple button from a Light’s on/off logic."
    a: |
      ```java
      interface Command { void execute(); }

      class Light { void on(){System.out.println("Light on");} void off(){System.out.println("Light off");} }

      class LightOn implements Command { private final Light l; LightOn(Light l){this.l=l;} public void execute(){l.on();}}
      class LightOff implements Command{ private final Light l; LightOff(Light l){this.l=l;} public void execute(){l.off();}}

      class RemoteButton {
          private Command cmd;
          public RemoteButton(Command c){cmd=c;}
          public void press(){cmd.execute();}
      }

      public class CommandDemo{
          public static void main(String[] args){
              Light living=new Light();
              new RemoteButton(new LightOn(living)).press();
              new RemoteButton(new LightOff(living)).press();
          }
      }
      ```
  - q: "Template Method: build a house – steps fixed, details vary."
    a: |
      ```java
      abstract class HouseTemplate {
          public final void build() { layFoundation(); buildWalls(); buildRoof(); }
          protected void layFoundation() { System.out.println("Concrete, Rebar, Gravel"); }
          protected abstract void buildWalls();
          protected abstract void buildRoof();
      }

      class WoodenHouse extends HouseTemplate {
          protected void buildWalls() { System.out.println("Wooden walls"); }
          protected void buildRoof()  { System.out.println("Wooden roof"); }
      }

      public class TemplateDemo {
          public static void main(String[] a) { new WoodenHouse().build(); }
      }
      ```
  - q: "Iterator: custom collection exposing sequential access."
    a: |
      ```java
      class NameRepository implements Iterable<String> {
          private final String[] names = {"Alice","Bob","Carol"};
          public java.util.Iterator<String> iterator() {
              return new java.util.Iterator<>() {
                  int idx;
                  public boolean hasNext(){ return idx < names.length; }
                  public String next(){ return names[idx++]; }
              };
          }
      }
      public class IteratorDemo {
          public static void main(String[] args){
              for(String n : new NameRepository()) System.out.println(n);
          }
      }
      ```

  # ---------- MEDIUM ----------
  - q: "Chain of Responsibility: log messages by severity."
    a: |
      ```java
      abstract class Logger {
          static final int INFO=1, DEBUG=2, ERROR=3;
          protected int level; private Logger next;
          Logger(int lvl){level=lvl;}
          void setNext(Logger n){next=n;}
          void log(int lvl, String msg){
              if(lvl>=level) write(msg);
              if(next!=null) next.log(lvl,msg);
          }
          protected abstract void write(String m);
      }
      class ConsoleLogger extends Logger { ConsoleLogger(){super(INFO);} protected void write(String m){System.out.println("INFO: "+m);} }
      class FileLogger    extends Logger { FileLogger(){super(DEBUG);}protected void write(String m){System.out.println("DEBUG file: "+m);} }
      class ErrorLogger   extends Logger { ErrorLogger(){super(ERROR);}protected void write(String m){System.out.println("ERROR email: "+m);} }

      public class CoRDemo{
          public static void main(String[] a){
              Logger l1=new ConsoleLogger(); Logger l2=new FileLogger(); Logger l3=new ErrorLogger();
              l1.setNext(l2); l2.setNext(l3);
              l1.log(Logger.INFO,"start"); l1.log(Logger.DEBUG,"value x=7"); l1.log(Logger.ERROR,"Disk full");
          }
      }
      ```
  - q: "State: traffic‑light cycles through GREEN→YELLOW→RED."
    a: |
      ```java
      interface State { State next(); String color(); }
      enum LightState implements State {
          GREEN{public State next(){return YELLOW;} public String color(){return "Green";}},
          YELLOW{public State next(){return RED;}    public String color(){return "Yellow";}},
          RED{public State next(){return GREEN;}     public String color(){return "Red";}}
      }
      class TrafficLight {
          private State state = LightState.RED;
          public void change(){ state = state.next(); }
          public String show(){ return state.color(); }
      }
      public class StateDemo{
          public static void main(String[] args){
              TrafficLight t=new TrafficLight();
              for(int i=0;i<6;i++){ t.change(); System.out.println(t.show()); }
          }
      }
      ```
  - q: "Mediator: chat room routes messages between users."
    a: |
      ```java
      interface Mediator{ void send(String msg, Colleague c); }
      interface Colleague{ void receive(String msg); String name(); }

      class ChatRoom implements Mediator{
          private final java.util.List<Colleague> users=new java.util.ArrayList<>();
          void join(Colleague c){users.add(c);}
          public void send(String m, Colleague s){
              users.stream().filter(u->u!=s).forEach(u->u.receive(s.name()+": "+m));
          }
      }
      class User implements Colleague{
          private final String nick; private final Mediator room;
          User(String n, Mediator r){nick=n;room=r; ((ChatRoom)r).join(this);}
          public String name(){return nick;}
          public void receive(String m){System.out.println("["+nick+" sees] "+m);}
          void say(String m){room.send(m,this);}
      }
      public class MediatorDemo{
          public static void main(String[] a){
              ChatRoom r=new ChatRoom();
              User a1=new User("Ann",r); User b=new User("Bob",r);
              a1.say("Hi Bob"); b.say("Hey Ann");
          }
      }
      ```
  - q: "Memento: simple text editor with one‑level undo."
    a: |
      ```java
      class Editor {
          private String text="";
          static class Memento{ final String state; Memento(String s){state=s;} }
          public void type(String s){ text+=s; }
          public Memento save(){ return new Memento(text); }
          public void restore(Memento m){ text=m.state; }
          public String get(){return text;}
      }
      public class MementoDemo{
          public static void main(String[] a){
              Editor e=new Editor();
              e.type("Hello "); Editor.Memento m=e.save();
              e.type("World"); System.out.println(e.get()); // Hello World
              e.restore(m);   System.out.println(e.get()); // Hello 
          }
      }
      ```
  - q: "Null Object: fallback logger that does nothing."
    a: |
      ```java
      interface Logger { void log(String m); }
      class RealLogger implements Logger { public void log(String m){System.out.println(m);} }
      class NullLogger implements Logger { public void log(String m){} } // no‑op

      class Service {
          private final Logger log;
          Service(Logger l){ log=(l==null)?new NullLogger():l; }
          void work(){ log.log("working"); }
      }
      public class NullObjectDemo{
          public static void main(String[] a){
              new Service(new RealLogger()).work();
              new Service(null).work(); // safe, no NPE
          }
      }
      ```

  # ---------- HARD ----------
  - q: "Interpreter: evaluate simple infix expressions like \"3 + 5 - 2\"."
    a: |
      ```java
      import java.util.*;
      interface Expr{ int eval(); }
      record Num(int v) implements Expr{ public int eval(){return v;} }
      record Add(Expr l,Expr r) implements Expr{ public int eval(){return l.eval()+r.eval();} }
      record Sub(Expr l,Expr r) implements Expr{ public int eval(){return l.eval()-r.eval();} }

      class Parser {
          private final String[] tok; private int pos;
          Parser(String s){ this.tok=s.split("\\s+"); }
          Expr parse(){ Expr e=term(); while(pos<tok.length){ String op=tok[pos++]; Expr t=term(); e= op.equals("+")? new Add(e,t): new Sub(e,t);} return e; }
          private Expr term(){ return new Num(Integer.parseInt(tok[pos++])); }
      }
      public class InterpreterDemo{
          public static void main(String[] a){
              String src="3 + 5 - 2";
              int result=new Parser(src).parse().eval();
              System.out.println(src+" = "+result); // 6
          }
      }
      ```
  - q: "Visitor: compute total area & perimeter of mixed shapes."
    a: |
      ```java
      interface Shape { <R> R accept(ShapeVisitor<R> v); }
      interface ShapeVisitor<R> { R visit(Rect r); R visit(Circle c); }

      record Rect(double w,double h) implements Shape {
          public <R> R accept(ShapeVisitor<R> v){ return v.visit(this); }
      }
      record Circle(double r) implements Shape {
          public <R> R accept(ShapeVisitor<R> v){ return v.visit(this); }
      }

      class AreaVisitor implements ShapeVisitor<Double>{
          public Double visit(Rect r){ return r.w()*r.h(); }
          public Double visit(Circle c){ return Math.PI*c.r()*c.r(); }
      }
      class PerimeterVisitor implements ShapeVisitor<Double>{
          public Double visit(Rect r){ return 2*(r.w()+r.h()); }
          public Double visit(Circle c){ return 2*Math.PI*c.r(); }
      }

      public class VisitorDemo{
          public static void main(String[] a){
              java.util.List<Shape> shapes=java.util.List.of(new Rect(2,3), new Circle(1));
              double area = shapes.stream().mapToDouble(s->s.accept(new AreaVisitor())).sum();
              double peri = shapes.stream().mapToDouble(s->s.accept(new PerimeterVisitor())).sum();
              System.out.println("Area="+area+", Perimeter="+peri);
          }
      }
      ```
  - q: "State (advanced): ATM – READY, CARD_INSERTED, AUTHENTICATED."
    a: |
      ```java
      interface AtmState{ void insertCard(Atm atm); void enterPin(Atm atm,String pin); void withdraw(Atm atm,int amt); }
      class Ready implements AtmState{
          public void insertCard(Atm a){ System.out.println("Card inserted"); a.set(new CardInserted()); }
          public void enterPin(Atm a,String p){ System.out.println("No card"); }
          public void withdraw(Atm a,int n){ System.out.println("Insert card first"); }
      }
      class CardInserted implements AtmState{
          public void insertCard(Atm a){ System.out.println("Already have card"); }
          public void enterPin(Atm a,String p){ if(p.equals("1234")){System.out.println("Auth OK"); a.set(new Authenticated());}
                                                else System.out.println("Bad PIN");}
          public void withdraw(Atm a,int n){ System.out.println("Need auth"); }
      }
      class Authenticated implements AtmState{
          public void insertCard(Atm a){ System.out.println("Card already");}
          public void enterPin(Atm a,String p){ System.out.println("Already authed"); }
          public void withdraw(Atm a,int amt){ System.out.println("Dispense $"+amt); a.set(new Ready()); }
      }
      class Atm{
          private AtmState st=new Ready();
          void set(AtmState s){st=s;}
          public void insertCard(){st.insertCard(this);}
          public void enterPin(String p){st.enterPin(this,p);}
          public void withdraw(int a){st.withdraw(this,a);}
      }
      public class AtmDemo{
          public static void main(String[] args){
              Atm atm=new Atm();
              atm.insertCard(); atm.enterPin("1234"); atm.withdraw(100);
          }
      }
      ```
  - q: "Command with Undo: calculator supporting +/− and UNDO."
    a: |
      ```java
      interface Command{ void exec(); void undo(); }
      class Calculator{
          private int val;
          int value(){return val;}
          void add(int x){val+=x;}
          void sub(int x){val-=x;}
      }
      class AddCmd implements Command{
          private final Calculator c; private final int n;
          AddCmd(Calculator c,int n){this.c=c;this.n=n;}
          public void exec(){c.add(n);}
          public void undo(){c.sub(n);}
      }
      class SubCmd implements Command{
          private final Calculator c; private final int n;
          SubCmd(Calculator c,int n){this.c=c;this.n=n;}
          public void exec(){c.sub(n);}
          public void undo(){c.add(n);}
      }
      class Invoker{
          private final java.util.Deque<Command> history=new java.util.ArrayDeque<>();
          void run(Command c){ c.exec(); history.push(c); }
          void undo(){ if(!history.isEmpty()) history.pop().undo(); }
      }
      public class UndoDemo{
          public static void main(String[] a){
              Calculator calc=new Calculator();
              Invoker inv=new Invoker();
              inv.run(new AddCmd(calc,5));
              inv.run(new SubCmd(calc,2));
              System.out.println(calc.value()); // 3
              inv.undo();
              System.out.println(calc.value()); // 5
          }
      }
      ```
  - q: "Mediator (complex): airport tower coordinates multiple planes."
    a: |
      ```java
      interface TowerMediator{ void requestLanding(Plane p); void notifyFreeRunway(); }
      class ControlTower implements TowerMediator{
          private final java.util.Queue<Plane> queue=new java.util.ArrayDeque<>();
          private boolean runwayFree=true;
          public void requestLanding(Plane p){
              System.out.println(p.id()+" requests landing");
              queue.add(p); attempt();
          }
          public void notifyFreeRunway(){ runwayFree=true; attempt(); }
          private void attempt(){
              if(runwayFree && !queue.isEmpty()){
                  runwayFree=false;
                  Plane p=queue.poll();
                  System.out.println("Tower to "+p.id()+": clear to land");
                  p.land();
              }
          }
      }
      class Plane{
          private final String call; private final TowerMediator tower;
          Plane(String id,TowerMediator t){call=id;tower=t;}
          String id(){return call;}
          void request(){tower.requestLanding(this);}
          void land(){ System.out.println(call+" landing..."); try{Thread.sleep(200);}catch(Exception e){} tower.notifyFreeRunway(); }
      }
      public class MediatorHardDemo{
          public static void main(String[] a){
              ControlTower t=new ControlTower();
              new Thread(()->new Plane("A1",t).request()).start();
              new Thread(()->new Plane("B2",t).request()).start();
              new Thread(()->new Plane("C3",t).request()).start();
          }
      }
      ```
---
