package de.jmpsoftware.backend.service;

import de.jmpsoftware.backend.model.Something;
import de.jmpsoftware.backend.repo.SomethingRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SomethingService {

    private final SomethingRepo somethingRepo;

    public SomethingService(SomethingRepo somethingRepo) {
        this.somethingRepo = somethingRepo;
    }

    public void addNewSomething(Something build) {
        somethingRepo.save(build);
    }

    public List<Something> getAll() {
        return somethingRepo.findAll();
    }

}
